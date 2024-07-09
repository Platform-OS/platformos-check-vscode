<h1 align="center" style="position: relative;" >
  <br>
    <img src="https://github.com/Platform-OS/platformos-check-vscode/blob/master/images/pos.jpg?raw=true" alt="logo" width="160" height="160">
  <br>
  platformOS
  <br>
</h1>

<h4 align="center">A complete developer experience for platformOS apps</h4>

Official VS Code extension for [platformOS](https://documentation.platformos.com/), powered by [platformOS Check][tc], the Liquid/GraphQL linter and language server for platformOS apps.

[Features](#features) |  [Installation](#installation) | [Configuration](#configuration) | [📦 VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=platformOS.platformos-check-vscode)

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

This VS Code extension depends on the [platformOS Check][tc] language server.

-----

⚠️ **Warning** Windows support is experimental.

-----

## Configuration

Optimize your development workflow by configuring the extension settings as follows:

- `"platformosLiquid.languageServerPath": string`, (optional): Specifies the path to the `platformos-check-language-server` executable.
- `"platformosLiquid.disableWindowsWarning": boolean`, (default: `false`): Set to `true` to disable experimental support warnings for Windows.
- `"platformosCheck.checkOnOpen": boolean`, (default: `true`): Automatically runs checks when a file is opened.
- `"platformosCheck.checkOnChange": boolean`, (default: `true`): Automatically runs checks when a file is modified.
- `"platformosCheck.checkOnSave": boolean`, (default: `true`): Automatically runs checks when a file is saved.
- `"platformosCheck.onlySingleFileChecks": boolean`, (default: `true`): Limits checks to the files currently open.

This configuration is great for enhancing performance during development by focusing on single-file checks. For comprehensive analysis, consider running full platformOS checks through the command line interface (CLI) or in your continuous integration (CI) environment.

## Credits

Special thanks to the Shopify team. This extension is based on [Shopify's theme-check-vscode](https://github.com/Shopify/theme-check-vscode).

[tc]: https://github.com/Platform-OS/platformos-lsp