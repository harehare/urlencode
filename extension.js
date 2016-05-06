var vscode = require('vscode');
var url = function (urlFunc) {

    var editor = vscode.window.activeTextEditor,
        document = editor.document,
        selection = editor.selection,
        text = document.getText(new vscode.Range(selection.start, selection.end)),
        alltext = document.getText();

    editor.edit(edit => {

        if (selection.start == selection.end) {
            var allSelection = new Selection(0, alltext.length - 1);
            edit.replace(allSelection, urlFunc(alltext));
            editor.selections = [];
        } else {
            edit.replace(selection, urlFunc(text));
            editor.selections = [selection];
        }

    }).then(bool => {
        if (bool) {
            console.log('executed sucessfully.');
        } else {
            console.log('failed.');
        }
    });
}

var activate = function (context) {

    console.log('Congratulations, your extension "urlencode" is now active!');
    var urlencode = vscode.commands.registerCommand('extension.urlencode', () => {
        url(encodeURIComponent)
    });

    var urldecode = vscode.commands.registerCommand('extension.urldecode', () => {
        url(decodeURIComponent)
    });

    context.subscriptions.push(urlencode);
    context.subscriptions.push(urldecode);
}

exports.activate = activate;