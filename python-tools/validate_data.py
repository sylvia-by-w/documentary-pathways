import yaml
import sys
from pathlib import Path

DATA_FILE = Path(__file__).parent / "content" / "films.yaml"

VALID_CURATION_LEVELS = {"background", "curated", "featured"}
VALID_RESEARCH_STATUS = {"unreviewed", "reviewed"}

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def validate(data):
    errors = []
    warnings = []

    films = data.get("films", [])
    directors = data.get("directors", [])
    pathways = data.get("pathways", [])
    director_ids = {d["id"] for d in directors}
    pathway_ids = {p["id"] for p in pathways}

    seen_ids = set()
    for f in films:
        fid = f.get("id")

        # 重复ID
        if fid in seen_ids:
            errors.append(f"重复的 film id: {fid}")
        seen_ids.add(fid)

        # 缺字段
        if not f.get("year"):
            errors.append(f"[{fid}] 缺少 year")
        if not f.get("title"):
            errors.append(f"[{fid}] 缺少 title")

        # directorStudy 是否存在
        ds = f.get("directorStudy")
        if ds and ds not in director_ids:
            errors.append(f"[{fid}] directorStudy '{ds}' 在 directors 里找不到")

        # directorIds 里的每个 id 是否存在
        for did in f.get("directorIds") or []:
            if did not in director_ids:
                errors.append(f"[{fid}] directorIds 里的 '{did}' 在 directors 里找不到")

        # pathway.id 是否存在于顶层 pathways
        pw = f.get("pathway")
        if pw and pw.get("id") not in pathway_ids:
            errors.append(f"[{fid}] pathway.id '{pw.get('id')}' 在顶层 pathways 里找不到")

        # curationLevel 取值是否合法
        level = f.get("curationLevel")
        if level and level not in VALID_CURATION_LEVELS:
            errors.append(f"[{fid}] curationLevel '{level}' 不合法，应为 {VALID_CURATION_LEVELS} 之一")
        elif not level:
            warnings.append(f"[{fid}] 缺少 curationLevel，建议补上（background/curated/featured）")

        # researchStatus 取值是否合法
        rstatus = f.get("researchStatus")
        if rstatus and rstatus not in VALID_RESEARCH_STATUS:
            errors.append(f"[{fid}] researchStatus '{rstatus}' 不合法，应为 {VALID_RESEARCH_STATUS} 之一")

        # featured 但没有任何 why / notes 内容
        if level == "featured":
            has_why = bool(pw and pw.get("why"))
            has_notes = bool(f.get("notes"))
            if not has_why and not has_notes:
                warnings.append(f"[{fid}] curationLevel 是 featured，但既没有 pathway.why 也没有 notes")

        # 已观看但没有观看日期
        if f.get("status") == "watched" and not f.get("watchDate"):
            warnings.append(f"[{fid}] 状态是 watched，但没有 watchDate")

        # notes 存在但内容全空
        notes = f.get("notes")
        if notes:
            filled = [v for v in notes.values() if v]
            if not filled:
                warnings.append(f"[{fid}] notes 字段存在但全是空的，考虑改成 null")

    # 顶层 pathway id 唯一性
    seen_pathway_ids = set()
    for p in pathways:
        pid = p.get("id")
        if pid in seen_pathway_ids:
            errors.append(f"重复的 pathway id: {pid}")
        seen_pathway_ids.add(pid)

    return errors, warnings

if __name__ == "__main__":
    data = load_data()
    errors, warnings = validate(data)

    print(f"检查了 {len(data.get('films', []))} 部纪录片，{len(data.get('pathways', []))} 条路径\n")

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
