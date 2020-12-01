import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
import { CommentProps, SingleComment } from "./Comment";

const useStyles = makeStyles({
	commentsWrapper: {
		marginBottom: 20,
	},
	comments: {
		marginTop: 20,
		paddingRight: 5,
		maxHeight: 700,
		overflowY: "auto",
		overflowX: "hidden",
	},
});

interface CommentsProps {
	/**
	 * Массив комментариев
	 */
	data: CommentProps[];
}

/**
 * Список комментариев
 *
 * @param {CommentsProps} props
 * @returns {JSX.Element}
 */
export const Comments: React.FC<CommentsProps> = React.memo(({ data }) => {
	const classes = useStyles();

	return (
		<div className={classes.commentsWrapper}>
			<div className={classes.comments}>
				<React.Fragment>
					{data.map((comment, i) => (
						<SingleComment {...comment} key={i} />
					))}
				</React.Fragment>
			</div>
			<Button color="primary">+ Показать больше</Button>
			<Button color="primary">- Скрыть</Button>
		</div>
	);
});
