import { makeStyles } from "@material-ui/core/styles";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { RichTextEditorTools } from "./RichTextEditorTools";
import { draftToMarkdown } from "markdown-draft-js";

const border = "1px solid #d2d2d2";

const useStyles = makeStyles({
	richEditorWrapper: {
		background: "#ffffff",
		border,
		marginBottom: 20,
	},
	richEditorArea: {
		padding: 10,
		height: 200,
		overflowY: "auto",
		boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.09)",
	},
});

const styleMap = {
	BOLD: {
		fontWeight: 600,
	},
};

interface RichTextEditorProps {
	onChange: (value: string) => void;
	forceClean?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	forceClean,
	...props
}: RichTextEditorProps): JSX.Element => {
	const classes = useStyles();

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	useEffect(() => {
		if (forceClean) {
			setEditorState(EditorState.createEmpty());
		}
	}, [forceClean]);

	const ref = createRef<any>();

	const onChange = useCallback(
		(nextEditorState: EditorState) => {
			setEditorState(nextEditorState);

			const content = nextEditorState.getCurrentContent();
			const rawObject = convertToRaw(content);
			const markdownString = draftToMarkdown(rawObject);

			props.onChange(markdownString);
		},
		[props.onChange]
	);

	const toggleBlockType = useCallback(
		(blockType: string) =>
			setEditorState(RichUtils.toggleBlockType(editorState, blockType)),
		[editorState]
	);

	const toggleInlineStyle = useCallback(
		(inlineStyle: string) =>
			setEditorState(
				RichUtils.toggleInlineStyle(editorState, inlineStyle)
			),
		[editorState]
	);

	const onClickArea = useCallback(
		() => ref && ref.current && ref.current.focus(),
		[ref]
	);

	return (
		<div className={classes.richEditorWrapper}>
			<RichTextEditorTools
				editorState={editorState}
				toggleBlockType={toggleBlockType}
				toggleInlineStyle={toggleInlineStyle}
			/>
			<div className={classes.richEditorArea} onClick={onClickArea}>
				<Editor
					editorState={editorState}
					onChange={onChange}
					spellCheck={true}
					customStyleMap={styleMap}
					ref={ref}
				/>
			</div>
		</div>
	);
};
