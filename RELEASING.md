## Releasing platformOS Check VSCode Extension

Follow these steps to prepare a new release of the platformOS VSCode extension:

1. Set the `VERSION` environment variable to the new version number and ensure your repository is up-to-date and set to the master branch:

```bash
VERSION=X.X.X
git checkout master
git fetch origin master:master
git reset --hard origin/master
```

2. Update the CHANGELOG: use `git-extras` to automatically update your CHANGELOG. If `git-extras` is not installed, consider manually updating the CHANGELOG or installing `git-extras`:

```bash
git changelog -t $VERSION
```

3. Update the `package.json` version to the newest version.

4. Commit your changes and push your changes.

```bash
git add .
git commit -m "Bump to $VERSION"
git push origin master
git tag "v$VERSION"
git push origin "v$VERSION"
```

3. Install dependencies, build the extension, and publish using `vsce`. Ensure `vsce` is installed; if not, install it using `yarn global add vsce`:

```bash
vsce login platformOS
scripts/check-yarn-links.sh && yarn && yarn build && yarn && yarn build && vsce publish $VERSION
```

4. [Create a new release on GitHub](https://github.com/Platform-OS/platformos-lsp/releases/new), ideally including highlights from the CHANGELOG:

```bash
VERSION=v1.X.Y
git fetch origin
git fetch origin --tags
git reset origin $VERSION
gh release create -t $VERSION
```

Remember to paste relevant sections from the CHANGELOG into the release notes to inform users of the changes in this version.