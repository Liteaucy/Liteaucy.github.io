# Liteaucy Academic Portfolio

科研型个人网站，采用纯 HTML + CSS，包含 Home、News、About、Education、Research、Publications、Projects、Skills、Awards、Blog、Gallery、CV 与 Contact。

## 本地预览

直接打开 `index.html`，或在项目目录启动任意静态文件服务器。

## 本地构建

```powershell
npm run build
```

构建成功后会生成 `dist/server/index.js`。构建脚本会把 `build.mjs` 中 `sourceAssets` 列出的文件打包进去。

## 修改内容

`index.html` 中已经加入 `EDIT` 注释，可搜索 `EDIT：` 快速定位：

- 首页：姓名、当前身份、个人陈述、研究关键词
- News：复制 `article` 新增动态
- Education：复制 `timeline-item` 新增教育经历
- Research：复制 `research-card` 新增科研项目
- Publications：替换论文占位区，添加 DOI / PDF / Code 链接
- Projects：替换项目卡片和链接
- More：补充奖项、博客和图片
- CV：上传 PDF 后把禁用按钮改为下载链接
- Contact：补充 Email 与 Google Scholar

不要随意修改各栏目 `id`；顶部导航依赖这些锚点。

## 修改样式

`styles/styles.css` 已按页面模块分区并加入中文注释。网站主色集中在文件顶部的 `:root` 变量中，建议优先修改：

- `--paper`：页面底色
- `--ink`：正文深色
- `--teal`：主强调色
- `--cyan`：浅强调色
- `--night`：深色模块背景

响应式断点位于样式文件末尾。

## 新增 CV、论文 PDF 或科研图片

1. 将文件放入项目内，例如 `files/cv-en.pdf` 或 `images/research/project-01.webp`。
2. 把相对路径加入 `build.mjs` 的 `sourceAssets`。
3. 若使用新文件类型，在 `contentTypes` 中补充 MIME 类型。
4. 在 `index.html` 中更新对应链接。
5. 再次运行 `npm run build`。

## 发布到 GitHub Pages

将项目内的网页文件提交到 `Liteaucy/Liteaucy.github.io` 仓库根目录。GitHub Pages 可直接发布 `index.html`；`dist` 主要用于本地/托管构建验证。

## 当前仍需真实资料

教育院校与时间、论文、奖项、CV、Email、Google Scholar、科研项目结果及相关图片尚未提供，目前均以明确占位内容展示，避免虚构个人履历。

