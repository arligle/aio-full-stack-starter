module.exports = {
  "*.{js,json,json5,jsonc,md,ts,yaml,yml}": ["biome lint", "git add"],
   "!(*.spec.ts|*.e2e-spec.ts)": [],
  // '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
  //   'yarn lint:prettier --parser json',
  // ],
  // 'package.json': ['yarn lint:prettier'],
  // '*.md': ['yarn lint:markdownlint', 'yarn lint:prettier'],
};
