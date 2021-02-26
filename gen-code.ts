import glob from "glob";
import fs from "fs";

const filepaths: Array<string> = glob.sync("src/data/sdk/**", {
  nodir: true,
});

async function main() {
  const contents = await Promise.all(
    filepaths.map(async (fpath) => {
      const content = fs.readFileSync(fpath, "utf-8");
      return [fpath.replace("src/data/sdk", ""), content];
    })
  );
  const obj = Object.fromEntries(contents);
  // console.log(obj);
  fs.writeFileSync("src/data/files.json", JSON.stringify(obj));
  // console.log(contents);
}

main();
