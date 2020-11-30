import { makeStyles } from "@material-ui/core/styles";
import React, { createRef, useCallback, useEffect, useState } from "react";
import {
	convertToRaw,
	Editor,
	EditorState,
	Modifier,
	RichUtils,
} from "draft-js";
import { RichTextEditorTools } from "./RichTextEditorTools";
import { draftToMarkdown } from "markdown-draft-js";
import clsx from "clsx";
import { LinkPicker } from "./LinkPicker";
import { richTextEditorDecorators } from "./decorators";

const border = "1px solid #d2d2d2";

const useStyles = makeStyles({
	richEditorWrapper: {
		background: "#ffffff",
		border,
		marginBottom: 20,
		position: "relative",
		transition: "border .2s ease-in-out",
	},
	richEditorWrapperFocus: {
		borderColor: "#4dd0e1",
	},
	richEditorArea: {
		padding: 10,
		height: 200,
		overflowY: "auto",
		transition: "box-shadow .2s ease-in-out",
	},
	richEditorAreaFocus: {
		boxShadow: "inset 0px 0px 10px #caefff",
	},
	toolsUnfocus: {
		opacity: 0.95,
		transition: "opacity .2s ease-in-out",
	},
});

const styleMap = {
	BOLD: {
		fontWeight: 600,
	},
	LINK: {
		color: "#0088bb",
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

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(richTextEditorDecorators)
	);

	const [focus, setFocus] = useState<boolean>();

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

			// TODO: кастомный маппер в markdown
			console.log(content, rawObject);

			const markdownString = draftToMarkdown(rawObject, {
				styleItems: {
					ITALIC: {
						open: () => "*",
						close: () => "*",
					},
				},
			});

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

	const onClickArea = useCallback(() => {
		if (ref && ref.current) {
			ref.current.focus();
			setFocus(true);
		}
	}, [ref]);

	const onBlur = useCallback(() => setFocus(false), []);

	const [linkPicker, setLinkPicker] = useState<boolean>();
	const toggleLinkPicker = useCallback(() => setLinkPicker(!linkPicker), [
		linkPicker,
	]);

	return (
		<div
			className={clsx(classes.richEditorWrapper, {
				[classes.richEditorWrapperFocus]: focus,
			})}
		>
			<RichTextEditorTools
				editorState={editorState}
				toggleBlockType={toggleBlockType}
				toggleInlineStyle={toggleInlineStyle}
				toggleLinkPicker={toggleLinkPicker}
				className={!focus ? classes.toolsUnfocus : undefined}
			/>
			{linkPicker && (
				<LinkPicker
					editorState={editorState}
					toggleLinkPicker={toggleLinkPicker}
					open={linkPicker}
					setEditorState={setEditorState}
				/>
			)}
			<div
				className={clsx(classes.richEditorArea, {
					[classes.richEditorAreaFocus]: focus,
				})}
				onClick={onClickArea}
			>
				<Editor
					editorState={editorState}
					onChange={onChange}
					spellCheck={true}
					customStyleMap={styleMap}
					onBlur={onBlur}
					ref={ref}
				/>
			</div>
		</div>
	);
};
