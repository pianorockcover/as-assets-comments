import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
import { CommentProps, SingleComment } from "./Comment";

const useStyles = makeStyles({
	comments: {
		marginBottom: 20,
		marginTop: 20,
		maxHeight: 500,
		overflowY: "auto",
		overflowX: "hidden",
	},
});

interface CommentsProps {
	data: CommentProps[];
}

export const Comments: React.FC<CommentsProps> = React.memo(({ data }) => {
	const classes = useStyles();

	const [showLastComment, setShowLastComment] = useState<boolean>(false);
	const [animationTimeout, setAnimationTimeout] = useState<number>(0);

	const dataLengthRef = useRef(data.length);
	useEffect(() => {
		if (dataLengthRef.current !== data.length) {
			dataLengthRef.current = data.length;
			setShowLastComment(false);
			setAnimationTimeout(0);

			setTimeout(() => {
				setAnimationTimeout(300);
				setShowLastComment(true);
			}, 10);
		}
	}, [data]);

	return (
		<div className={classes.comments}>
			{data.map((comment, i) => (
				<SingleComment
					{...comment}
					key={i}
					index={i}
					showLastComment={showLastComment}
					animationTimeout={animationTimeout}
				/>
			))}
		</div>
	);
});
