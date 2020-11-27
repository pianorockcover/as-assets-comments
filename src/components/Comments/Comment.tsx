import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	convertFromRaw,
	Editor as MarkdownViewer,
	EditorState,
} from "draft-js";
import { noop } from "lodash";
import { markdownToDraft } from "markdown-draft-js";
import React from "react";

const useStyles = makeStyles({
	comment: {
		marginBottom: 10,
		background: "#dddddd",
		padding: 10,
	},
	author: {
		fontWeight: 500,
	},
	date: {
		opacity: 0.8,
		marginBottom: 10,
	},
});

export interface CommentProps {
	text: string;
	author: string;
	date: string;
	index?: number;
}

export const SingleComment: React.FC<CommentProps> = React.memo(
	({ author, date, text, index }: CommentProps) => {
		const classes = useStyles();

		const markdownString = text;
		const rawData = markdownToDraft(markdownString);
		const contentState = convertFromRaw(rawData);
		const editorState = EditorState.createWithContent(contentState);

		return (
			<CommentContainer index={index}>
				<div className={classes.comment}>
					<div className={classes.author}>{author}</div>
					<div className={classes.date}>{date}</div>
					<MarkdownViewer
						editorState={editorState}
						onChange={noop}
						readOnly={true}
					/>
				</div>
			</CommentContainer>
		);
	}
);

const CommentContainer: React.FC<{ index?: number }> = ({ children, index }) =>
	index === 1 ? (
		<Zoom in={true}>
			<>{children}</>
		</Zoom>
	) : (
		<>{children}</>
	);
