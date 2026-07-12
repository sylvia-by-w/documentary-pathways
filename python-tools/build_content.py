import yaml
import json
from pathlib import Path

BASE = Path(__file__).parent
DATA_FILE = BASE / "content" / "films.yaml"
OUTPUT_DIR = BASE.parent / "src" / "data"  # 直接写进React项目的src/data

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def build_documentaries(films):
    """给旧的 Index 页面用：只要有 pathway 字段的片子（扁平列表，不分路径）"""
    result = []
    for f in films:
        if f.get("pathway"):
            result.append({
                "id": f["id"],
                "title": f["title"],
                "year": f["year"],
                "country": ", ".join(f.get("country", [])),
                "stage": f["pathway"]["stage"],
                "stageLabel": f["pathway"]["stageLabel"],
                "stageZh": f["pathway"]["stageZh"],
                "why": f["pathway"]["why"]
            })
    return result

def build_pathways(pathways, films):
    """给 Pathways / PathwayDetail 页面用：每条路径带上自己的影片列表"""
    result = []
    for p in pathways:
        pathway_films = [
            {
                "id": f["id"],
                "title": f["title"],
                "year": f["year"],
                "country": ", ".join(f.get("country", [])),
                "stage": f["pathway"]["stage"],
                "stageLabel": f["pathway"]["stageLabel"],
                "stageZh": f["pathway"]["stageZh"],
                "why": f["pathway"]["why"]
            }
            for f in films
            if f.get("pathway") and f["pathway"]["id"] == p["id"]
        ]
        result.append({**p, "films": pathway_films})
    return result

def build_directors(directors, films):
    """给 Directors 页面用：把每位导演的作品列表附加进去"""
    result = []
    for d in directors:
        filmography = [
            {"id": f["id"], "title": f["title"], "chineseTitle": f.get("chineseTitle", ""),
             "year": f["year"], "status": f["status"],
             "curationLevel": f.get("curationLevel", "background")}
            for f in films if f.get("directorStudy") == d["id"]
        ]
        result.append({**d, "filmography": filmography})
    return result

def build_notes(films):
    """给 Notes 页面用：只要 notes 字段不为空的片子"""
    result = []
    for f in films:
        if f.get("notes"):
            note = f["notes"]
            result.append({
                "id": f"{f['id']}-note",
                "filmId": f["id"],
                "title": f["title"],
                "chineseTitle": f.get("chineseTitle", ""),
                "year": f["year"],
                "director": f.get("director", ""),
                "watchDate": f.get("watchDate"),
                "relatedDirector": f.get("directorStudy"),
                **note
            })
    return result

def write_json(filename, content):
    path = OUTPUT_DIR / filename
    with open(path, "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)
    print(f"✅ 生成 {path}")

if __name__ == "__main__":
    data = load_data()
    films = data.get("films", [])
    directors = data.get("directors", [])
    pathways = data.get("pathways", [])

    write_json("documentaries.json", build_documentaries(films))
    write_json("pathways.json", build_pathways(pathways, films))
    write_json("directors.json", build_directors(directors, films))
    write_json("notes.json", build_notes(films))
