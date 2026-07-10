import yaml
import sys
from pathlib import Path

DATA_FILE = Path(__file__).parent / "content" / "films.yaml"

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def validate(data):
    errors = []
    warnings = []

    films = data.get("films", [])
    directors = data.get("directors", [])
    director_ids = {d["id"] for d in directors}

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

        # 已观看但没有观看日期
        if f.get("status") == "watched" and not f.get("watchDate"):
            warnings.append(f"[{fid}] 状态是 watched，但没有 watchDate")

        # notes 存在但内容全空
        notes = f.get("notes")
        if notes:
            filled = [v for v in notes.values() if v]
            if not filled:
                warnings.append(f"[{fid}] notes 字段存在但全是空的，考虑改成 null")

    return errors, warnings

if __name__ == "__main__":
    data = load_data()
    errors, warnings = validate(data)

    print(f"检查了 {len(data.get('films', []))} 部纪录片\n")

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