# semantic-release-github-actions-tags

A Semantic Release Plugin to create / update additional version Tags for a GitHub Action during a release, e.g. for Version `v1.0.0`, this plugin will push the tags `v1` and `v1.0`, pointing them to `v1.0.0`.

This is a best practice for releasing GitHub Actions as also described in the [GitHub Docs for creating actions - Release and maintaining actions](https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions#example-developer-process).

This plugin is supposed to be used in conjunction with the [`@semantic-release/git`](https://github.com/semantic-release/git) and [`@semantic-release/github`](https://github.com/semantic-release/github) plugins so that both, the `dist` files of your action are pushed and a release is created.

> **Warning**
> As this plugin is built to be used with those plugins, there is currently no verification step as this would just duplicate all required verifications (that is the existence of a `GITHUB_TOKEN` and the permission to `git push`).

## Installation

```bash
npm install --save-dev semantic-release-github-actions-tags
```

## Example Configuration

```js
const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ["@semantic-release/git", {
      "assets": ["dist/*.js"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    '@semantic-release/github',
    'semantic-release-github-actions-tags'
  ]
};

module.exports = config;
```

You can use the above configuration in a GitHub workflow like this:

```yaml
name: Release

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      ## Build Step to Output dist/index.js
      - name: Build
        run: npm run build
      ## With the above semantic-release configuration, will create a release and push the dist/index.js file as well as all the tags required
      - name: Semantic Release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
