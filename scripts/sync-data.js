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
  steam: "curated-static",
  minecraft: "public-status-pending",
  roblox: "manual-review-required",
  wordle: "strategy-only",
  note: "Automated API credentials are not configured in this repository. The production build publishes curated links and omits unverified live claims."
});

console.log(`Data sync state updated at ${today}`);
