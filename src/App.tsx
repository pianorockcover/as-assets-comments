import { Button } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { RichTextEditor } from "./components/RichTextEditor/RichTextEditor";
import { noop } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { CommentProps } from "./components/Comments/Comment";
import { Comments } from "./components/Comments/Comments";

const useStyles = makeStyles({
	appWrapper: {
		margin: "0 auto",
		maxWidth: 700,
		height: "100vh",
		padding: 10,
		background: "#f5f5f5",
	},
});

function App() {
	const classes = useStyles();
	const [comments, setComments] = useState<CommentProps[]>([]);

	const [currentComment, setCurrentComment] = useState<string>();

	const leaveComment = useCallback(
		() =>
			currentComment &&
			setComments([
				{
					author: "Тест Тестов",
					date: "23.09.2020 20:31",
					text: currentComment,
				},
				...comments,
			]),
		[currentComment, comments]
	);

	return (
		<div className={classes.appWrapper}>
			<RichTextEditor onChange={setCurrentComment} />
			<Button
				variant="contained"
				color="primary"
				size="small"
				onClick={leaveComment}
			>
				Оставить комментарий
			</Button>
			<Comments data={comments} />
		</div>
	);
}

export default App;
