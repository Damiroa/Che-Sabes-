import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { promisify } from "node:util";
import { gzip } from "node:zlib";
import { resolve, extname, sep } from "node:path";

const compress = promisify(gzip);
const publicDir = resolve(
  import.meta.dirname,
  "../artifacts/trivia-game/dist/public",
);
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Invalid PORT");
await stat(resolve(publicDir, "index.html")); // Fail immediately if the build is missing.
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  const file = resolve(
    publicDir,
    `.${pathname === "/" ? "/index.html" : pathname}`,
  );
  if (!file.startsWith(publicDir + sep) || pathname.includes("\0")) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    const extension = extname(file);
    const compressible = [".html", ".js", ".css", ".json", ".svg"].includes(
      extension,
    );
    const acceptsGzip = (req.headers["accept-encoding"] ?? "")
      .split(",")
      .some((entry) => {
        const [encoding, ...parameters] = entry.trim().toLowerCase().split(";");
        const quality = parameters.find((value) =>
          value.trim().startsWith("q="),
        );
        return (
          encoding === "gzip" &&
          (!quality || Number(quality.trim().slice(2)) > 0)
        );
      });
    const encoded = compressible && data.length > 1024 && acceptsGzip;
    const body = encoded ? await compress(data) : data;
    res.writeHead(200, {
      ...(encoded ? { "Content-Encoding": "gzip" } : {}),
      Vary: "Accept-Encoding",
      "Content-Length": body.length,
      "Content-Type": mime[extname(file)] ?? "application/octet-stream",
      "Cache-Control": pathname.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "0.0.0.0", () =>
  console.log(`Che Sabés listening on port ${port}`),
);
