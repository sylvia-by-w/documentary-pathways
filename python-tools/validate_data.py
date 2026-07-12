import yaml
import sys
from pathlib import Path
from datetime import date

CONTENT_DIR = Path(__file__).parent / "content"

VALID_CURATION_LEVELS = {"background", "curated", "featured"}
VALID_RESEARCH_STATUS = {"unreviewed", "reviewed"}
VALID_WATCH_STATUS = {"watched", "to-watch"}
MIN_YEAR = 1895  # 电影诞生年份，早于这个基本可以断定是录入错误
MAX_YEAR = date.today().year + 1  # 容许未上映的下一年


def load_yaml(name):
    with open(CONTENT_DIR / f"{name}.yaml", "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def find_dupes(items, key="id"):
    seen = set()
    dupes = set()
    for it in items:
        v = it.get(key)
        if v in seen:
            dupes.add(v)
        seen.add(v)
    return dupes


def validate(films, directors, pathways, notes, taxonomy):
    errors = []
    warnings = []

    director_ids = {d["id"] for d in directors}
    film_ids = {f["id"] for f in films}
    pathway_ids = {p["id"] for p in pathways}
    note_ids = {n["id"] for n in notes}
    theme_ids = {t["id"] for t in taxonomy.get("themes", [])}
    subject_ids = {s["id"] for s in taxonomy.get("subjects", [])}
    form_ids = {fo["id"] for fo in taxonomy.get("forms", [])}

    # --- 重复 ID ---
    for fid in find_dupes(films):
        errors.append(f"重复的 film id: {fid}")
    for did in find_dupes(directors):
        errors.append(f"重复的 director id: {did}")
    for pid in find_dupes(pathways):
        errors.append(f"重复的 pathway id: {pid}")
    for nid in find_dupes(notes):
        errors.append(f"重复的 note id: {nid}")

    # --- films ---
    for f in films:
        fid = f.get("id", "<no id>")

        for required in ("id", "title", "year"):
            if not f.get(required):
                errors.append(f"[film:{fid}] 缺少必填字段 {required}")

        year = f.get("year")
        if year and not (MIN_YEAR <= year <= MAX_YEAR):
            errors.append(f"[film:{fid}] year={year} 不在合理范围 {MIN_YEAR}-{MAX_YEAR} 内")

        for did in f.get("directorIds") or []:
            if did not in director_ids:
                errors.append(f"[film:{fid}] directorIds 引用的 '{did}' 在 directors.yaml 里找不到")

        level = f.get("curationLevel")
        if level and level not in VALID_CURATION_LEVELS:
            errors.append(f"[film:{fid}] curationLevel '{level}' 不合法，应为 {sorted(VALID_CURATION_LEVELS)} 之一")
        elif not level:
            warnings.append(f"[film:{fid}] 缺少 curationLevel，建议补上")

        rstatus = f.get("researchStatus")
        if rstatus and rstatus not in VALID_RESEARCH_STATUS:
            errors.append(f"[film:{fid}] researchStatus '{rstatus}' 不合法，应为 {sorted(VALID_RESEARCH_STATUS)} 之一")

        wstatus = f.get("status")
        if wstatus and wstatus not in VALID_WATCH_STATUS:
            errors.append(f"[film:{fid}] status（观看状态）'{wstatus}' 不合法，应为 {sorted(VALID_WATCH_STATUS)} 之一")

        if wstatus == "watched" and not f.get("watchDate"):
            warnings.append(f"[film:{fid}] 状态是 watched，但没有 watchDate")

        for theme in f.get("themes") or []:
            if theme not in theme_ids:
                errors.append(f"[film:{fid}] themes 引用的 '{theme}' 不在 taxonomy.yaml 的 themes 里")
        for subj in f.get("subjects") or []:
            if subj not in subject_ids:
                errors.append(f"[film:{fid}] subjects 引用的 '{subj}' 不在 taxonomy.yaml 的 subjects 里")
        for form in f.get("forms") or []:
            if form not in form_ids:
                errors.append(f"[film:{fid}] forms 引用的 '{form}' 不在 taxonomy.yaml 的 forms 里")

        for rel in f.get("relatedFilms") or []:
            rel_id = rel.get("filmId") if isinstance(rel, dict) else rel
            if rel_id not in film_ids:
                errors.append(f"[film:{fid}] relatedFilms 引用的 '{rel_id}' 在 films.yaml 里找不到")

        if level == "featured" and not (notes and any(n["filmId"] == fid for n in notes)):
            has_pathway_why = any(
                step["filmId"] == fid and step.get("why")
                for p in pathways for step in p.get("steps", [])
            )
            if not has_pathway_why:
                warnings.append(f"[film:{fid}] curationLevel 是 featured，但既没有笔记也没有 pathway 的 why")

    # --- directors ---
    for d in directors:
        did = d.get("id", "<no id>")
        for required in ("id", "name"):
            if not d.get(required):
                errors.append(f"[director:{did}] 缺少必填字段 {required}")
        if not any(did in (f.get("directorIds") or []) for f in films):
            warnings.append(f"[director:{did}] 没有任何影片的 directorIds 引用它")

    # --- pathways ---
    for p in pathways:
        pid = p.get("id", "<no id>")
        for step in p.get("steps", []):
            fid = step.get("filmId")
            if fid not in film_ids:
                errors.append(f"[pathway:{pid}] steps 引用的 filmId '{fid}' 在 films.yaml 里找不到")
        if p.get("status") not in {"active", "soon"}:
            errors.append(f"[pathway:{pid}] status '{p.get('status')}' 不合法，应为 active/soon 之一")

    # --- notes ---
    for n in notes:
        nid = n.get("id", "<no id>")
        fid = n.get("filmId")
        if fid not in film_ids:
            errors.append(f"[note:{nid}] filmId '{fid}' 在 films.yaml 里找不到")
        text_fields = [v for k, v in n.items() if k not in ("id", "filmId") and isinstance(v, str)]
        if text_fields and not any(text_fields):
            warnings.append(f"[note:{nid}] 所有正文字段都是空的，考虑先不建这条")

    return errors, warnings


if __name__ == "__main__":
    films = load_yaml("films").get("films", [])
    directors = load_yaml("directors").get("directors", [])
    pathways = load_yaml("pathways").get("pathways", [])
    notes = load_yaml("notes").get("notes", [])
    taxonomy = load_yaml("taxonomy")

    errors, warnings = validate(films, directors, pathways, notes, taxonomy)

    print(f"检查了 {len(films)} 部影片、{len(directors)} 位导演、{len(pathways)} 条路径、{len(notes)} 篇笔记\n")

    if errors:
        print("❌ 错误:")
        for e in errors:
            print(f"  - {e}")
    else:
        print("✅ 没有发现错误")

    if warnings:
        print("\n⚠️ 警告:")
        for w in warnings:
            print(f"  - {w}")

    if errors:
        sys.exit(1)
