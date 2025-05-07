// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { App } from "./App";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-debug-visualizer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('cpp-debug-visualizer.open', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('C++ Debug Visualizer Opened!');
		var panel = vscode.window.createWebviewPanel(
			'cppDebugVisualizer', // Identifies the type of the webview. Used internally
			'C++ Debug Visualizer', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
			}
		);

			// Cargar HTML con el cssUri reemplazado
		const cssUri = panel.webview.asWebviewUri(
			vscode.Uri.file(path.join(context.extensionPath, 'media', 'style.css'))
		);

		const scriptUri = panel.webview.asWebviewUri(
			vscode.Uri.file(path.join(context.extensionPath, 'media', 'leader-line.min.js'))
		);
		  
		const htmlPath = path.join(context.extensionPath, 'media', 'webview.html');
		let html = fs.readFileSync(htmlPath, 'utf8');
		html = html.replace('${cssUri}', cssUri.toString());
		html = html.replace('${scriptUri}', scriptUri.toString());
		panel.webview.html = html;

		panel.webview.onDidReceiveMessage(async (message) => {
			if (message.type === 'update-variables') {
			  const session = vscode.debug.activeDebugSession;
			  const frame = vscode.debug.activeDebugConsole; // o usar frame de evento

		  
			  if (session) {
				const variables = await getVariablesFromSession(session);
				// Aqui es donde se filtran los scopes
				const app = new App();
				// coger el scope locals
				const locals = variables.find((scope) => scope.scope === 'Locals');

				// pasar scope locals a app y visualizar
				if (locals) {
					console.log("VARIABLES:");
					console.log(JSON.stringify(locals.variables, null, 2));
					app.createDataList(locals.variables);
					
				}
				
				const htmlData = app.visualizeData();

				panel.webview.postMessage({ type: 'variables', data: htmlData });
			  }
			}
		});
	});

	context.subscriptions.push(disposable);
}

async function expandVariable(session: vscode.DebugSession, variable: any): Promise<any> {
	const expanded: any = { ...variable };
  
	if (variable.variablesReference && variable.variablesReference > 0) {

		const response = await session.customRequest('variables', {
		variablesReference: variable.variablesReference
		});

		expanded.children = [];

		for (const child of response.variables) {
		const fullChild = await expandVariable(session, child);  // llamada recursiva
		expanded.children.push(fullChild);
		}
	}
  
	return expanded;
  }
  

async function getVariablesFromSession(session: vscode.DebugSession) {
	const threads = await session.customRequest('threads');
	const threadId = threads.threads[0]?.id;
	if (!threadId) return [];

	const stack = await session.customRequest('stackTrace', { threadId });
	const frameId = stack.stackFrames[0]?.id;
	if (!frameId) return [];

	const scopesResponse = await session.customRequest('scopes', { frameId });

	const data = [];

	for (const scope of scopesResponse.scopes) {
		const varsResponse = await session.customRequest('variables', {
			variablesReference: scope.variablesReference
		});

		const expandedVariables = [];

		for (const variable of varsResponse.variables) {
			const fullVar = await expandVariable(session, variable);
			expandedVariables.push(fullVar);
		}

		data.push({
			scope: scope.name,
			variables: expandedVariables
		});
	}
	

	return data;
}
  
// This method is called when your extension is deactivated
export function deactivate() {}
