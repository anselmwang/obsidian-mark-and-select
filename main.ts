import { cmpPos } from 'codemirror';
import { Editor, EditorPosition, MarkdownView, Plugin } from 'obsidian';

export default class AdvancedSelectionPlugin extends Plugin {
	one_end_position: EditorPosition;

	private editorMode: 'cm5' | 'cm6' = null;
	private initialized = false;

	private getCodeMirror(view: MarkdownView): CodeMirror.Editor {
		// For CM6 this actually returns an instance of the object named CodeMirror from cm_adapter of codemirror_vim
		if (this.editorMode == 'cm6')
			return (view as any).sourceMode?.cmEditor?.cm?.cm;
		else
			return (view as any).sourceMode?.cmEditor;
	}

	async initialize() {
		if (this.initialized)
			return;

		// Determine if we have the legacy Obsidian editor (CM5) or the new one (CM6).
		// This is only available after Obsidian is fully loaded, so we do it as part of the `file-open` event.
		if ('editor:toggle-source' in (this.app as any).commands.editorCommands) {
			this.editorMode = 'cm6';
			console.log('using CodeMirror 6 mode');
		} else {
			this.editorMode = 'cm5';
			console.log('using CodeMirror 5 mode');
		}
		this.initialized = true;
	}

	async onload() {
		await this.initialize();
		this.addCommand({
			id: 'set-mark',
			name: 'Set mark',
			icon: 'pencil',
			hotkeys: [{modifiers: ['Ctrl', 'Shift'], key: '2'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getCursor());
				this.one_end_position= editor.getCursor();
				const cm = this.getCodeMirror(view);
				cm.on("cursorActivity", (cm: CodeMirror.Editor) =>
				{
					console.log(cm.getCursor());

				})
			}
		});
		this.addCommand({
			id: 'select-from-mark',
			name: 'Select from mark',
			icon: 'up-and-down-arrows',
			hotkeys: [{modifiers: ['Ctrl', 'Shift'], key: '3'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				if(this.one_end_position != null)
				{
					editor.setSelection(this.one_end_position, editor.getCursor());
				}
			}
		});
	}

	onunload() {

	}

}
