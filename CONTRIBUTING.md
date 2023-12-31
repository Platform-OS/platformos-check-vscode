# Contributing to platformOS Check VSCode

We love receiving pull requests!

## Standards

* PR should explain what the feature does, and why the change exists.
* PR should include any carrier specific documentation explaining how it works.
* Code should be generic and reusable.

## How to contribute

1. Fork it ( https://github.com/Platform-OS/platformos-check-vscode/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Development

Check https://github.com/Platform-OS/liquid-tm-grammar/blob/master/CONTRIBUTING.md


## Pack extension to file

      npm run build # run this every time you change something
      vsce pack --out pos-vscode.vsix
