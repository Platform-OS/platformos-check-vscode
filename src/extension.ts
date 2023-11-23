import { promisify } from 'util';
import * as child_process from 'child_process';

import {
  commands,
  Disposable,
  DocumentFilter,
  ExtensionContext,
  extensions,
  languages,
  Uri,
  window,
  workspace,
} from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node';
import LiquidFormatter from './formatter';
import path = require('path');
const exec = promisify(child_process.exec);

const LIQUID: DocumentFilter[] = [
  {
    language: 'liquid',
    scheme: 'file',
  },
  {
    language: 'liquid',
    scheme: 'untitled',
  },
];

class CommandNotFoundError extends Error {}

const isWin = process.platform === 'win32';
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

let client: LanguageClient | undefined;
let context: { subscriptions: Disposable[] } | undefined;

function getConfig(path: string) {
  const [namespace, key] = path.split('.');
  return workspace.getConfiguration(namespace).get(key);
}

export async function activate(extensionContext: ExtensionContext) {
  context = extensionContext;

  context.subscriptions.push(
    commands.registerCommand('platformosLiquid.restart', restartServer),
  );
  context.subscriptions.push(
    commands.registerCommand('platformosLiquid.runChecks', () =>
      client!.sendRequest('workspace/executeCommand', {
        command: 'runChecks',
      }),
    ),
  );

  const diagnosticTextDocumentVersion = new Map<Uri, number>();
  const diagnosticCollection = languages.createDiagnosticCollection(
    'prettier-plugin-liquid',
  );
  context.subscriptions.push(diagnosticCollection);

  const formattingProvider = languages.registerDocumentFormattingEditProvider(
    LIQUID,
    new LiquidFormatter(diagnosticCollection, diagnosticTextDocumentVersion),
  );
  context.subscriptions.push(formattingProvider);

  workspace.onDidChangeConfiguration(onConfigChange);

  // If you change the file, the prettier syntax error is no longer valid
  workspace.onDidChangeTextDocument(({ document }) => {
    const bufferVersionOfDiagnostic = diagnosticTextDocumentVersion.get(
      document.uri,
    );
    if (bufferVersionOfDiagnostic !== document.version) {
      diagnosticCollection.delete(document.uri);
    }
  });

  await startServer();
}

export function deactivate() {
  return stopServer();
}

async function startServer() {
  const serverOptions = await getServerOptions();
  console.info(
    'platformos.platformos-check-vscode Server options %s',
    JSON.stringify(serverOptions, null, 2),
  );
  if (!serverOptions) {
    return;
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'liquid' },
      { scheme: 'file', language: 'plaintext' },
      { scheme: 'file', language: 'html' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'css' },
      { scheme: 'file', language: 'scss' },
      { scheme: 'file', language: 'json' },
    ],
  };

  client = new LanguageClient(
    'platformosLiquid',
    'PlatformOS Check Language Server',
    serverOptions,
    clientOptions,
  );

  client.start();
}

async function stopServer() {
  try {
    if (client) {
      await Promise.race([client.stop(), sleep(1000)]);
    }
  } catch (e) {
    console.error(e);
  } finally {
    context = undefined;
    client = undefined;
  }
}

async function restartServer() {
  if (client) {
    await stopServer();
  }
  await startServer();
}

function onConfigChange(event: {
  affectsConfiguration: (arg0: string) => any;
}) {
  const didChangePlatformOSCheck = event.affectsConfiguration(
    'platformosLiquid.languageServerPath',
  );
  if (didChangePlatformOSCheck) {
    restartServer();
  }
}

let hasShownWarning = false;
async function getServerOptions(): Promise<ServerOptions | undefined> {
  const disableWarning = getConfig('platformosLiquid.disableWindowsWarning');
  if (!disableWarning && isWin && !hasShownWarning) {
    hasShownWarning = true;
    window.showWarningMessage(
      'PlatformOS Liquid support on Windows is experimental. Please report any issue.',
    );
  }
  let platformosCheckPath = getConfig('platformosLiquid.languageServerPath') as
    | string
    | undefined;

  if(isWin && !platformosCheckPath){
    const extensionPath = extensions?.getExtension("platformOS.platformos-check-vscode")?.extensionPath;
    if (extensionPath) {
      platformosCheckPath = path.join(extensionPath, 'execs', 'lsp.exe');
    }
  }
  try {
    const executable: ServerOptions | undefined =
      (platformosCheckPath && (await platformosCheckExecutable(platformosCheckPath))) ||
      (await getPlatformOSCheckExecutable());
    if (!executable) {
      throw new Error('No executable found');
    }
    return executable;
  } catch (e) {
    if (e instanceof CommandNotFoundError) {
      window.showErrorMessage(e.message);
    } else {
      if (isWin) {
        window.showWarningMessage(
          `The 'platformos-check-language-server' executable was not found on your $PATH. Was it installed? The path can also be changed via the "platformosLiquid.languageServerPath" setting.`,
        );
      } else {
        console.error(e);
        window.showWarningMessage(
          `The 'platformos-check-language-server' executable was not found on your $PATH. Was it installed? The path can also be changed via the "platformosLiquid.languageServerPath" setting.`,
        );
      }
    }
  }
}

async function which(command: string) {
  if (isWin) {
    const { stdout } = await exec(`where.exe ${command}`);
    const executables = stdout
      .replace(/\r/g, '')
      .split('\n')
      .filter((exe) => exe.endsWith('bat'));
    return executables.length > 0 && executables[0];
  } else {
    const { stdout } = await exec(`which ${command}`);
    return stdout.split('\n')[0].replace('\r', '');
  }
}

async function getPlatformOSCheckExecutable(): Promise<ServerOptions | undefined> {
  try {
    const path = await which('platformos-check-language-server');
    return platformosCheckExecutable(path);
  } catch (e) {
    return undefined;
  }
}

async function platformosCheckExecutable(
  command: string | boolean,
): Promise<ServerOptions | undefined> {
  if (typeof command !== 'string' || command === '') {
    return undefined;
  }
  await commandExists(command);
  return {
    command,
  };
}

async function commandExists(command: string): Promise<void> {
  try {
    !isWin && (await exec(`[ -f "${command}" ]`));
  } catch (e) {
    throw new CommandNotFoundError(
      `${command} not found, are you sure this is the correct path?`,
    );
  }
}
