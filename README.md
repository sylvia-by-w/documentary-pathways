# Documentary Pathways

Documentary Pathways is a personal documentary research and curation platform that connects films, filmmakers, themes, viewing pathways, and reflective notes. The React interface is supported by a Python-based content build and validation workflow.

这不是一个电影数据库，也不是一个评分推荐网站。它是一个持续生长的个人纪录片研究档案：记录看过什么、为什么看、看的时候在想什么，以及不同作品之间是如何被我自己串联起来的。

## Why

大多数纪录片网站要么是数据库（豆瓣、IMDb、TMDb），要么是流媒体入口，都不回答"我该从哪部开始看、为什么这样看、看完之后接下来看什么"这类问题。这个项目试图把三件事放在一起：

- 一定规模的背景数据（未来会接入 TMDb）
- 我自己做的人工研究（导演、主题、拍摄方式的判断）
- 我自己写的策展与解读（为什么选它、怎么看、看完想到什么）

## Current features

- **Pathways**（观看路径）：把若干部影片按照理解推进的顺序排成一条路径，每一步都有"为什么在这里"的理由
- **Director Studies**（导演研究）：围绕一位导演持续观看其作品，记录反复出现的问题
- **Viewing Notes**（观看笔记）：结构化的观影笔记，包含观看前的期待、观看中注意到的细节、观看后留下的问题
- **Index**（索引）：全部影片的统一列表，可按观看状态筛选
- **Workflow / About**：说明这个项目的研究方法和定位

## Content architecture

内容分三层，粒度从"客观资料"到"个人判断"依次递增：

```
Background data      国际数据库里能查到哪些作品（计划中，TMDb）
Curated research      这些作品在关注什么（导演、主题、拍摄方式，人工整理）
Editorial writing      为什么值得这样看（笔记、路径、推荐理由，个人书写）
```

每部影片有一个 `curationLevel` 字段标记它处在哪一层：

- `background` — 自动导入，未核对（TMDb 数据用，目前还没有）
- `curated` — 已核对基础信息、已打标签，但还没写完整的策展内容
- `featured` — 已观看、已写笔记或已放入某条路径，有完整详情页

## Data workflow

人工内容全部写在 YAML 里，React 只读取 Python 生成的 JSON，两者之间不应该有第三份手写数据：

```
python-tools/content/*.yaml   ← 人工编辑的唯一数据源
        ↓ validate_data.py     （检查 ID 唯一性、字段合法性、引用完整性）
        ↓ build_content.py     （生成 JSON）
src/data/generated/*.json     ← 生成产物，不要手改
        ↓
     React 页面只读取这里
```

`content/` 下按实体拆成五个文件：

| 文件 | 负责什么 |
|---|---|
| `films.yaml` | 影片基础资料、观看状态、策展等级 |
| `directors.yaml` | 导演信息、研究说明 |
| `pathways.yaml` | 观看路径、影片顺序、每一步的理由 |
| `notes.yaml` | 观看笔记，通过 `filmId` 关联影片 |
| `taxonomy.yaml` | 合法的 theme / subject / form 标签表，`films.yaml` 里引用的标签必须在这里出现过 |

## Tech stack

- **前端**：React 19 + React Router 7 + Vite，纯静态站点，没有后端
- **数据管道**：Python 3 + PyYAML，负责校验和生成 JSON
- **代码检查**：oxlint

## Project structure

```
documentary-pathways/
├── src/
│   ├── components/         # DocCard, Nav
│   ├── pages/               # Home, Pathways, Directors, Notes, Index, Workflow, About ...
│   ├── data/generated/      # Python 生成的 JSON，不要手改
│   └── styles/
│
├── python-tools/
│   ├── content/              # 人工维护的 YAML 唯一数据源
│   │   ├── films.yaml
│   │   ├── directors.yaml
│   │   ├── pathways.yaml
│   │   ├── notes.yaml
│   │   └── taxonomy.yaml
│   ├── build_content.py      # YAML → JSON
│   ├── validate_data.py      # 校验 YAML
│   └── requirements.txt
│
└── package.json
```

## Local setup

```bash
npm install
pip install -r python-tools/requirements.txt

npm run content:all   # 校验 + 生成 JSON（改了 YAML 之后要重新跑）
npm run dev
```

## Editing content

1. 改 `python-tools/content/*.yaml` 里对应的文件
2. 跑 `npm run content:validate`，看有没有报错（ID 重复、引用不存在的导演/影片/标签，都会在这一步拦下来）
3. 跑 `npm run content:build`，把改动生成到 `src/data/generated/`
4. `npm run dev` 确认页面显示正常

不要直接编辑 `src/data/generated/` 下的文件，下次跑 `content:build` 会被覆盖。

## npm scripts

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run lint` | oxlint 检查 |
| `npm run content:validate` | 校验 YAML |
| `npm run content:build` | 生成 JSON |
| `npm run content:all` | 先 validate 再 build |

## Roadmap

- [ ] 接入 TMDb API，作为 `background` 层的背景数据样本
- [ ] 影片详情页（按 curationLevel 展示不同深度的内容）
- [ ] 影片间的关系与推荐（先人工维护，量大了再考虑自动化）
- [ ] Data Perspective 页面：TMDb 样本 vs 人工策展样本的年代、议题分布对比
- [ ] 扩充徐童专题到 4-6 部作品，补完第二条观看路径
