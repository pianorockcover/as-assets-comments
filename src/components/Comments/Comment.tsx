import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles({
	comment: {
		marginBottom: 10,
		background: "#e8e8e8",
		padding: 10,
		borderRadius: 5,
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

		return (
			<CommentContainer {...props}>
				<div className={classes.comment}>
					<div className={classes.author}>{author}</div>
					<div className={classes.date}>{date}</div>
					{/* TODO: заюзать: @crossfield/react-read-more */}
					<ReactMarkdown>{text}</ReactMarkdown>
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
