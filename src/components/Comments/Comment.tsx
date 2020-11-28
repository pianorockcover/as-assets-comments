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
		background: "#e8e8e8",
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
	showLastComment?: boolean;
	animationTimeout?: number;
	visible?: boolean;
}

export const SingleComment: React.FC<CommentProps> = React.memo(
	({ author, date, text, ...props }: CommentProps) => {
		const classes = useStyles();

		const markdownString = text;
		const rawData = markdownToDraft(markdownString);
		const contentState = convertFromRaw(rawData);
		const editorState = EditorState.createWithContent(contentState);

		return (
			<CommentContainer {...props}>
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

const CommentContainer: React.FC<
	Pick<
		CommentProps,
		"index" | "showLastComment" | "animationTimeout" | "visible"
	>
> = ({ children, index, showLastComment, animationTimeout, visible }) =>
	index === 0 && !visible ? (
		<Zoom in={showLastComment} timeout={animationTimeout}>
			<div>{children}</div>
		</Zoom>
	) : (
		<div>{children}</div>
	);
