import { Button } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { RichTextEditor } from "./components/RichTextEditor/RichTextEditor";
import { makeStyles } from "@material-ui/core/styles";
import { CommentProps } from "./components/Comments/Comment";
import { Comments } from "./components/Comments/Comments";
import fakeApiComments from "./fake-api.json";

const useStyles = makeStyles({
	appWrapper: {
		margin: "0 auto",
		maxWidth: 700,
		height: "100vh",
		padding: 10,
		background: "#f5f5f5",
	},

	"@global": {
		"*::-webkit-scrollbar": {
			width: 10,
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "rgba(0,0,0,.1)",
			borderRadius: 5,
		},
	},
});

function App() {
	const classes = useStyles();

	const [comments, setComments] = useState<CommentProps[]>(fakeApiComments);
	const [forceClean, setForceClean] = useState<number>();
	const [currentComment, setCurrentComment] = useState<string>();

	const leaveComment = useCallback(() => {
		if (currentComment) {
			setComments([
				{
					author: "Тест Тестов",
					date: "23.09.2020 20:31",
					text: currentComment,
				},
				...comments,
			]);
			setForceClean(+new Date());
			setCurrentComment(undefined);

			console.log(currentComment);
		}
	}, [currentComment, comments]);

	return (
		<div className={classes.appWrapper}>
			<RichTextEditor
				onChange={setCurrentComment}
				forceClean={forceClean}
			/>
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
