import * as vscode from 'vscode';

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId !== 'rust' || !document.fileName.endsWith('.rs')) {
      return;
    }

    const formatOnSave =
        vscode.workspace.getConfiguration('rust')['formatOnSave'] || false;
    if (formatOnSave) {
      const rustfmtPath =
          vscode.workspace.getConfiguration('rust')['rustfmtPath'] || 'rustfmt';
      const exec = require('child_process').exec;
      exec(rustfmtPath + ' ' + document.fileName, (err: Error) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }));
}

export function deactivate() {}
