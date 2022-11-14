import { ViewPlugin, ViewUpdate, EditorView } from "@codemirror/view"
import { App, Editor, EditorRange, MarkdownView, Notice, Plugin } from 'obsidian';

function getCursor(editor: Editor): EditorRange {
	return { from: editor.getCursor(), to: editor.getCursor() };
}

export default class ObsidianEmacsPlugin extends Plugin {

	async onload() {

		this.addCommand({
			id: 'recenter-top-bottom',
			hotkeys: [{ modifiers: ["Ctrl"], key: "l" }],
			name: 'Scroll the window so that current line is in the middle of the window.',
			editorCallback: (editor: Editor) => {
				this.recenterTopBottom(editor);
			}
		});

		this.addCommand({
			id: 'kill-line',
			hotkeys: [{ modifiers: ["Ctrl"], key: "k" }],
			name: 'Kill the rest of the current line; if no nonblanks there, kill thru newline.',
			editorCallback: (editor: Editor) => {
				this.killLine(editor);
			}
		});

	}

	onunload() {
	}

	async recenterTopBottom(editor: Editor) {
		editor.scrollIntoView(getCursor(editor), true);
	}

	async killLine(editor: Editor) {
		const { line } = editor.getCursor();
		const from_ = editor.getCursor("from");
		const to = editor.getCursor("to");
		if (from_.line === to.line && from_.ch === to.ch){
			// nothing selected and kill line
			const length = editor.getLine(line).length;
			if (length === to.ch || length === 0) {
				editor.setSelection({line:line, ch:0}, {line:line+1, ch:0});
			} else {
				editor.setSelection(from_, {line:line, ch:length});
			}
		}
		// kill the selection directly
		const sel = editor.getSelection();
		if (sel !== "" && sel !== "\n") {
			await navigator.clipboard.writeText(sel);
		}
		editor.replaceSelection("");
	}
}
