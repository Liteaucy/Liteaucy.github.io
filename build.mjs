import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const serverRoot = path.join(distRoot, "server");

// 维护提示：新增 CV、论文 PDF、科研图片或脚本后，必须把相对路径加入这里，
// 否则本地 index.html 能看到文件，但 npm run build 不会把它打包到 dist。
const sourceAssets = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "styles/styles.css",
  "images/favicon.png",
  "images/og.png",
];

// 维护提示：如果新增了 PDF、JavaScript 等文件类型，也要在这里声明正确的 MIME。
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });

const assetEntries = await Promise.all(
  sourceAssets.map(async (relativePath) => {
    const data = await readFile(path.join(projectRoot, relativePath));
    const extension = path.extname(relativePath);
    const route = `/${relativePath.replaceAll("\\", "/")}`;

    return [
      route,
      {
        body: data.toString("base64"),
        cache: extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
        etag: `"${createHash("sha256").update(data).digest("hex")}"`,
        type: contentTypes[extension] ?? "application/octet-stream",
      },
    ];
  }),
);

const workerSource = `const assets = ${JSON.stringify(Object.fromEntries(assetEntries))};

function decodeBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    const url = new URL(request.url);
    let pathname;

    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad Request", { status: 400 });
    }

    if (pathname === "/") pathname = "/index.html";

    const asset = assets[pathname];
    if (!asset) return new Response("Not Found", { status: 404 });

    if (request.headers.get("If-None-Match") === asset.etag) {
      return new Response(null, { status: 304, headers: { ETag: asset.etag } });
    }

    const headers = new Headers({
      "Cache-Control": asset.cache,
      "Content-Type": asset.type,
      "ETag": asset.etag,
      "X-Content-Type-Options": "nosniff",
    });

    if (pathname === "/index.html") {
      headers.set(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:; style-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
      );
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    }

    const body = request.method === "HEAD" ? null : decodeBase64(asset.body);
    return new Response(body, { status: 200, headers });
  },
};
`;

await writeFile(path.join(serverRoot, "index.js"), workerSource);
console.log(`Built ${sourceAssets.length} assets into dist/server/index.js`);
