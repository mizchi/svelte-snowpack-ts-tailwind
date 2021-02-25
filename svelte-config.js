const sveltePreprocess = require("svelte-preprocess");

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [require("tailwindcss")],
  },
});

module.exports = {
  preprocess,
};
