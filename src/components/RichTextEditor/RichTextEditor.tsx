import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

const border = "1px solid #d2d2d2";

const useStyles = makeStyles({
	richEditorWrapper: {
		background: "#ffffff",
		border,
		marginBottom: 20,
	},
	richEditorArea: {
		padding: 10,
		minHeight: 200,
		overflowY: "auto",
	},
});

interface RichTextEditorProps {
	onChange: (value: string) => void;
	defaultValue: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	defaultValue,
	onChange,
}: RichTextEditorProps): JSX.Element => {
	const classes = useStyles();

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	// https://codepen.io/Kiwka/pen/YNYvyG
	return (
		<div className={classes.richEditorWrapper}>
			<Editor
				editorState={editorState}
				onChange={setEditorState}
				spellCheck={true}
			/>
		</div>
	);
};
