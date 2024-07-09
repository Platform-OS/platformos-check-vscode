# Troubleshooting

## I am not seeing completions or linting errors

1. Ensure that you have detailed logging enabled for the language server. Add the following setting to your `settings.json` to view logs in the OUTPUT tab:

```json
"platformosLiquid.trace.server": "verbose",
```

2. Restart the language server to apply any changes and start fresh logging:

- Open the command palette with `Cmd+P` (or `Ctrl+P` on Windows/Linux).
- Type and select `platformOS Check: Restart Server`.

3. From the dropdown menu in the OUTPUT tab, select `platformOS Check Language Server`.

4. Look through the logs for entries labeled `serverInfo`. You can quickly search using `Cmd+F` on macOS or `Ctrl+F` on Windows/Linux and typing `serverInfo`.

5. The logs should display the path to the `platformos-check-language-server` executable. If this path is incorrect or missing, the server might not be installed correctly or not found due to a configuration issue (presumably because of a problem with you `$PATH` environment variable).

Ensure that the path to `platformos-check-language-server` is correctly set. If the path is not detected automatically, you may need to hardcode it manually in  your `settings.json`:

```json
"platformosLiquid.languageServerPath": "<path-to-your-language-server-executable>"
```

Replace `"<path-to-your-language-server-executable>"` with the actual path where the executable is located on your system.

- **Windows**: Use the `where` command in the Command Prompt to find the executable path. Remember to escape backslashes in your JSON file (`C:\\path\\to\\server`).

- **Linux/macOS**: Use the `which` command in the terminal to locate the executable. Provide the full path in your settings.
