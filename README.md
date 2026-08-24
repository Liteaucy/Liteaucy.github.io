Liteaucy Personal Site

这是一个可直接部署到 GitHub Pages 的纯静态个人主页，不依赖构建工具。

## 文件结构

```text
liteaucy-personal-site/
├─ index.html
├─ robots.txt
├─ sitemap.xml
├─ styles/
│  └─ styles.css
└─ images/
   ├─ hero.webp
   ├─ hero-mobile.webp
   ├─ avatar.webp
   ├─ favicon.png
   └─ og.png
```

## 本地预览

直接双击 `index.html` 即可查看。若浏览器限制本地资源，可在本目录启动任意静态文件服务器。

## 部署到 GitHub Pages

1. 备份当前仓库内容。
2. 将本目录内的文件和文件夹复制到 `Liteaucy/Liteaucy.github.io` 仓库根目录。
3. 提交并推送到 GitHub；Pages 会继续使用 `https://liteaucy.github.io/`。

## 修改个人信息

- 页面文案与链接：编辑 `index.html`。
- 颜色、排版与响应式样式：编辑 `styles/styles.css`。
- 替换主图时，保留现有文件名可免改代码；建议继续使用 WebP。
- 当前只使用已确认的 GitHub 与网站地址。获得真实的 Bilibili 个人空间地址后，可在联系区新增链接。

## 图片说明

原主页主图已转换为适合网页加载的 WebP：桌面版约 492 KB、移动版约 266 KB，避免继续加载约 13.6 MB 的原始 PNG。`og.png` 用于社交平台分享预览。
