// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-debug-visualizer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('cpp-debug-visualizer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from C++ Debug Visualizer!');
		var panel = vscode.window.createWebviewPanel(
			'cppDebugVisualizer', // Identifies the type of the webview. Used internally
			'C++ Debug Visualizer', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
			}
		);
		// And set its HTML content
		const htmlPath = path.join(context.extensionPath, 'media', 'webview.html');
		let html = fs.readFileSync(htmlPath, 'utf8');

		panel.webview.html = html;
	});

	context.subscriptions.push(disposable);
}

// This function returns the HTML content for the webview
function getWebviewContent() {
	// You can use any HTML and JavaScript here
	// This is a simple example that creates a button and displays an alert when clicked
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>C++ Debug Visualizer</title>
	</head>
	<body>
		<h1>C++ Debug Visualizer</h1>
		<p>This is a simple webview for C++ Debug Visualizer.</p>
		<button onclick="showAlert()">Click me!</button>
	</body>
	</html>`;
}
// The commandId parameter must match the command field in package.json

// This method is called when your extension is deactivated
export function deactivate() {}
