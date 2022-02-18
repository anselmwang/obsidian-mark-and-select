import { Editor, EditorPosition, MarkdownView, Plugin } from 'obsidian';

export default class AdvancedSelectionPlugin extends Plugin {
	one_end_position: EditorPosition;

	async onload() {
		this.addCommand({
			id: 'set-mark',
			name: 'Set mark',
			icon: 'pencil',
			hotkeys: [{modifiers: ['Ctrl', 'Shift'], key: '2'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getCursor());
				this.one_end_position= editor.getCursor();
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
