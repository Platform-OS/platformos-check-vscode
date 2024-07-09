# Contributing to platformOS Check VSCode Extension

We appreciate and welcome all contributions!

## Standards

- **Pull Requests (PRs)**: Each PR should clearly describe what the feature does and the reason for the change.
- **Documentation**: Include relevant documentation that explains how the new feature or change works.
- **Code Quality**: Ensure that the code is generic, reusable, and adheres to common coding standards.

## How to Contribute

Follow these steps to contribute to the project:

1. **Fork the Repository**: Start by forking the project repository to your GitHub account. Click here to fork: [platformos-check-vscode fork](https://github.com/Platform-OS/platformos-check-vscode/fork).
2. **Create a Feature Branch**: Create a branch for your new feature:
   ```bash
   git checkout -b my-new-feature
   ```
3. **Commit Changes**: Commit your changes to your branch:
   ```bash
   git commit -am 'Add some feature'
   ```
4. **Push to GitHub**: Push your changes to your GitHub repository:
   ```bash
   git push origin my-new-feature
   ```
5. **Submit a Pull Request**: Go to the original project repository and submit a pull request from your feature branch.

## Development Guidelines

For specific development guidelines, refer to the contributing guide for the [liquid-tm-grammar](https://github.com/Platform-OS/liquid-tm-grammar/blob/master/CONTRIBUTING.md), which includes additional details on setting up your development environment.

## Packaging the Extension

To package your changes into an installable VSIX file for VS Code, follow these steps:

1. **Build the Extension**:

   ```bash
   npm run build
   ```

   Run this command every time you make changes to ensure that your changes are included in the build.

2. **Package the Extension**:

   ```bash
   vsce pack --out pos-vscode.vsix
   ```

   This command creates a `.vsix` file that you can install in VS Code or distribute to others.
