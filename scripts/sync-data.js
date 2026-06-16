const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const today = new Date().toISOString();

const writeJson = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

writeJson(path.join(root, "src/data/sync-state.json"), {
  checkedAt: today,
  steam: "fallback-cache",
  minecraft: "fallback-cache",
  roblox: "fallback-cache",
  note: "This placeholder keeps GitHub Actions deterministic until API keys are configured."
});

console.log(`Data sync state updated at ${today}`);
