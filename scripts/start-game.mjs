import { spawn } from "node:child_process";
import { existsSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pidFile = resolve(root, ".game-server.pid");
const logFile = resolve(root, "game-server.log");

if (existsSync(pidFile)) {
  const previousPid = Number(readFileSync(pidFile, "utf8"));
  try {
    process.kill(previousPid, 0);
    console.log(`El juego ya está ejecutándose en http://localhost:3000/ (PID ${previousPid}).`);
    process.exit(0);
  } catch {
    writeFileSync(pidFile, "");
  }
}

const logFd = openSync(logFile, "a");
const child = spawn("pnpm", ["--filter", "@workspace/trivia-game", "dev"], {
  cwd: root,
  detached: true,
  env: { ...process.env, PORT: "3000", BASE_PATH: "/", NODE_ENV: "development" },
  stdio: ["ignore", logFd, logFd],
});

writeFileSync(pidFile, String(child.pid));
child.unref();
console.log(`Juego ejecutándose en http://localhost:3000/ (PID ${child.pid}).`);
console.log(`Logs: ${logFile}`);
