<h1 align="center" style="position: relative;" >
  <br>
    <img src="https://github.com/Platform-OS/platformos-check-vscode/blob/master/images/pos.jpg?raw=true" alt="logo" width="160" height="160">
  <br>
  platformOS
  <br>
</h1>

<h4 align="center">A complete developer experience for platformOS apps</h4>

Official VS Code extension for [platformOS](https://documentation.platformos.com/) powered by [platformOS Check][tc] the Liquid/GraphQL linter and language server for platformOS apps.

[Features](#features) |  [Installation](#installation) | [Configuration](#configuration) | [📦 VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=platformOS.platformos-check-vscode).

## Features

- 🎨 Syntax highlighting
- 💧 Liquid/GraphQL language server ([platformOS Check][tc])
  - 📗 Completions
  - ✅ Linting
  - 🔎 Go to source
- 💅 Formatting ([Liquid Prettier plugin](https://github.com/shopify/prettier-plugin-liquid))
- 📐 Automatic indentation
- 🎎 Auto closing pairs

## Installation

In order to use the extension you would need to install the dependencies:
1. Download and [install latest version of Ruby](https://www.ruby-lang.org/en/documentation/installation/) 
2. Install the platformos-check gem from the terminal:
    ```
    gem install platformos-check
    ```

You can verify the installation was successful by invoking `platformos-check --version`.

More information about the language server: [platformOS Check][tc]

-----

⚠️ **Warning** Windows support is experimental.

-----

## Configuration

- `"platformosLiquid.languageServerPath": string`, (optional) a path to the `platformos-check-language-server` executable.
- `"platformosLiquid.disableWindowsWarning": boolean`, (default: `false`) When true, platformOS check won't bug you with the Windows warning anymore.
- `"platformosCheck.checkOnOpen": boolean`, (default: `true`) makes it so platformOS check runs on file open.
- `"platformosCheck.checkOnChange": boolean`, (default: `true`) makes it so platformOS check runs on file change.
- `"platformosCheck.checkOnSave": boolean`, (default: `true`) makes it so platformOS check runs on file save.
- `"platformosCheck.onlySingleFileChecks": boolean`, (default: `true`) makes it so platformOS check only runs single file checks for the files that are open.

  Great for performance if can ignore checks that span multiple files during development and otherwise run full platformOS checks on the CLI or in CI.


## Credits

Credits to Shopify team, as this extension is based on [theme-check-vscode](https://github.com/Shopify/theme-check-vscode)

[tc]: https://github.com/Platform-OS/platformos-lsp
