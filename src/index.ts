// import App from "./App.svelte";
// import ts from "typescript";
// import "tailwindcss/dist/tailwind.css";
import { bundleLocal, bundle, ResolveIdFallback } from "uniroll";
import { svelte } from "rollup-plugin-uniroll-svelte";
import files from "./data/files.json";
import ts from "typescript";
import Layout from "./components/Layout.svelte";

let app: any;
async function main() {
  // app = new App({ target: document.body });
  // console.log(
  //   ts.createSourceFile("x.ts", "const x: number = 1;", ts.ScriptTarget.Latest)
  // );
  // debugger;
  // const resolveIdFallback: ResolveIdFallback = (
  //   id: string,
  //   importer?: string
  // ) => {
  //   // console.log
  //   if (importer == null) {
  //     return;
  //   }
  //   if (id.startsWith(".")) {
  //     return;
  //   }
  //   if (["svelte", "svelte/internal"].includes(id)) {
  //     return `https://cdn.skypack.dev/${id}`;
  //   }
  //   if (id.startsWith("https://") || id.startsWith(".")) {
  //     return id;
  //   }
  //   return `https://esm.sh/${id}`;
  // };

  new Layout({ target: document.body });

  // const x = await bundle({
  //   input: "/index.ts",
  //   files: {
  //     ...files,
  //     "/index.ts": `
  //   import Main from "./Main.svelte";
  //   new Main({ target: document.body });
  //   `,
  //   },
  //   // resolveIdFallback,
  //   extraPlugins: [
  //     svelte({
  //       // resolveIdFallback,
  //       target: ts.ScriptTarget.ES5,
  //       svelteOptions: {},
  //     }),
  //   ],
  // });
  // const ret = await x.generate({ format: "iife" });
  // const code = ret.output[0].code;
  // eval(code);

  // console.log("built", ret.output[0].code);
}

main().catch(console.error);

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept();
  // @ts-ignore
  import.meta.hot.dispose(() => {
    app?.$destroy();
  });
}
