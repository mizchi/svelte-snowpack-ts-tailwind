/*
  Patch typescript to run in snowpack.
  I added this workaround for perf_hooks.
  Add this task in package.json

  "scripts": {
    // ...
    "postinstall": "node scripts/rewrite-ts.js",
  }
*/

const fs = require("fs");
const path = require("path");

const ts_path = path.join(
  __dirname,
  "../node_modules/typescript/lib/typescript.js"
);
const code = fs.readFileSync(ts_path, "utf-8");
const rewrote = code.replace('require("perf_hooks")', "{}");

fs.writeFileSync(ts_path, rewrote);
console.log("patched", ts_path);
