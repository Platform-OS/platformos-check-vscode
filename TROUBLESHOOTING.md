## I am not seeing completions or linting errors

First we need to make sure that you have a running version of the language server.

1. In your `settings.json` add the following to enable language server logging in the OUTPUT tab:

  ```
  "platformosLiquid.trace.server": "verbose",
  ```

2. Restart the language server from the command palette (`cmd+p` > `platformOS Check: Restart Server`):

3. From the OUTPUT tab, select `platformOS Check Language Server`:

4. You should see logs, search for `serverInfo` in the logs (`cmd+f` + `serverInfo`)

5. We expect the path to `platformos-check-language-server` on your machine.

   If you don't see that, either you did not install it or we can't find it (presumably because of a problem with you `$PATH` environment variable).

   When that happens, try hardcoding the following `settings.json` configuration:

    - `"platformosLiquid.languageServerPath"` the path to the `platformos-check-language-server` executable.

  **Note:** If you are on Windows, you'd find the path with the `where` command, also note that JSON requires escaping backslashes in paths.

  **Note:** If you are on Linux/macOS, you should be able to find it with the `which` command
