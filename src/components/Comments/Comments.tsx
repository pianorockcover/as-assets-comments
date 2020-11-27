import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CommentProps, SingleComment } from "./Comment";

const useStyles = makeStyles({
	comments: {
		marginBottom: 20,
		marginTop: 20,
	},
});

interface CommentsProps {
	data: CommentProps[];
}

export const Comments: React.FC<CommentsProps> = ({ data }) => {
	const classes = useStyles();

	return (
		<div className={classes.comments}>
			{data.map((comment, i) => (
				<SingleComment {...comment} key={i} index={i} />
			))}
		</div>
	);
};
