import yaml
import json
from pathlib import Path

BASE = Path(__file__).parent
CONTENT_DIR = BASE / "content"
OUTPUT_DIR = BASE.parent / "src" / "data" / "generated"


def load_yaml(name):
    with open(CONTENT_DIR / f"{name}.yaml", "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def load_all():
    return {
        "films": load_yaml("films").get("films", []),
        "directors": load_yaml("directors").get("directors", []),
        "pathways": load_yaml("pathways").get("pathways", []),
        "notes": load_yaml("notes").get("notes", []),
        "taxonomy": load_yaml("taxonomy"),
    }


def build_films(films):
    """给 Archive/Index 页面用：影片基础资料的完整列表"""
    return films


def build_pathways(pathways, films):
    """给 Pathways / PathwayDetail 页面用：每条路径带上自己的影片列表（保留旧的卡片字段形状）"""
    films_by_id = {f["id"]: f for f in films}
    result = []
    for p in pathways:
        step_films = []
        for step in p.get("steps", []):
            film = films_by_id.get(step["filmId"])
            if not film:
                continue
            step_films.append({
                "id": film["id"],
                "title": film["title"],
                "year": film["year"],
                "country": ", ".join(film.get("country", [])),
                "stage": step["stage"],
                "stageLabel": step["stageLabel"],
                "stageZh": step["stageZh"],
                "why": step["why"]
            })
        result.append({
            "id": p["id"],
            "title": p["title"],
            "zh": p.get("zh", ""),
            "coreQuestion": p.get("coreQuestion", ""),
            "status": p["status"],
            "films": step_films
        })
    return result


def build_directors(directors, films):
    """给 Directors 页面用：把每位导演的作品列表附加进去（按 directorIds 关联，不再依赖单独的 directorStudy 字段）"""
    result = []
    for d in directors:
        filmography = [
            {"id": f["id"], "title": f["title"], "chineseTitle": f.get("chineseTitle", ""),
             "year": f["year"], "status": f["status"],
             "curationLevel": f.get("curationLevel", "background")}
            for f in films if d["id"] in (f.get("directorIds") or [])
        ]
        result.append({**d, "filmography": filmography})
    return result


def build_notes(notes, films):
    """给 Notes 页面用：notes.yaml 是独立列表，这里用 filmId 拼回影片信息展示用的字段"""
    films_by_id = {f["id"]: f for f in films}
    result = []
    for n in notes:
        film = films_by_id.get(n["filmId"])
        if not film:
            continue
        result.append({
            **n,
            "title": film["title"],
            "chineseTitle": film.get("chineseTitle", ""),
            "year": film["year"],
            "director": film.get("director", ""),
            "watchDate": film.get("watchDate"),
            "relatedDirector": (film.get("directorIds") or [None])[0]
        })
    return result


def build_taxonomy(taxonomy):
    return taxonomy


def write_json(filename, content):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / filename
    with open(path, "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)
    print(f"✅ 生成 {path}")


if __name__ == "__main__":
    data = load_all()
    films = data["films"]
    directors = data["directors"]
    pathways = data["pathways"]
    notes = data["notes"]
    taxonomy = data["taxonomy"]

    write_json("films.json", build_films(films))
    write_json("pathways.json", build_pathways(pathways, films))
    write_json("directors.json", build_directors(directors, films))
    write_json("notes.json", build_notes(notes, films))
    write_json("taxonomy.json", build_taxonomy(taxonomy))
