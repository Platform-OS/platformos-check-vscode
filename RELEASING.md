1.  Set the VERSION environment variable and make sure you're on the latest master.

    ```bash
    VERSION=X.X.X
    git checkout master
    git fetch origin master:master
    git reset --hard origin/master
    ```

2.  Update the CHANGELOG.

    ```bash
    # if you have git-extras installed
    git changelog -t $VERSION
    ```

1.  Update the package.json version to the newest version.

2.  Commit your changes and push your changes.

    ```bash
    git add .
    git commit -m "Bump to $VERSION"
    git push origin master
    git tag "v$VERSION"
    git push origin "v$VERSION"
    ```

3.  Install node deps + build extension + publish (assumes you have `vsce` globally installed - `yarn global add vsce`)

    ```bash
    vsce login platformOS
    scripts/check-yarn-links.sh && yarn && yarn build && yarn && yarn build && vsce publish $VERSION
    ```

4.  Make a GitHub release for the change.

    https://github.com/Platform-OS/platformos-check-vscode/releases/new
