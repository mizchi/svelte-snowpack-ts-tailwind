/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: "/",
    src: "/dist",
    /* ... */
  },
  alias: {
    // perf_hooks: "./src/perf_hooks-dummay.js",
    // perf_hooks: "",
    path: "path-browserify",
    rollup: "rollup/dist/es/rollup.browser.js",
  },
  plugins: [
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-svelte",
    // "./plugins/my-plugin",
    [
      "snowpack-plugin-replace",
      {
        list: [
          {
            from: 'require("perf_hooks")',
            to: "{performance: { now() {} }}",
          },
        ],
      },
    ],
    /* ... */
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    external: ["fsevents", "posix", "perf_hooks"],
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
