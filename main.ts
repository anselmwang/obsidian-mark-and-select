import { Editor, EditorPosition, MarkdownView, Plugin } from 'obsidian';

export default class AdvancedSelectionPlugin extends Plugin {
	one_end_position: EditorPosition;

	async onload() {
		this.addCommand({
			id: 'set-one-end-of-selection',
			name: 'Set one end of selection',
			icon: 'pencil',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getCursor());
				this.one_end_position= editor.getCursor();
			}
		});
		this.addCommand({
			id: 'select',
			name: 'Select from one end',
			icon: 'up-and-down-arrows',
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
