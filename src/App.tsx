import { Button, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { RichTextEditor } from "./components/RichTextEditor/RichTextEditor";
import { makeStyles } from "@material-ui/core/styles";
import { CommentProps } from "./components/Comments/Comment";
import { Comments } from "./components/Comments/Comments";
import fakeApiComments from "./fake-api.json";
import { CardLayout } from "./components/CardLayout/CardLayout";

const useStyles = makeStyles({
	"@global": {
		"*::-webkit-scrollbar": {
			width: 10,
			height: 10,
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "rgba(0, 0, 0, .3)",
			borderRadius: 5,
		},
		"*::-webkit-scrollbar-track": {
			backgroundColor: "rgba(0, 0, 0, .1)",
		},
	},
	body: {
		minWidth: 1000,
		backgroundColor: "#eef2f4",
	},
	leaveCommentBtn: {
		marginBottom: 20,
	},
	badge: {
		background: "#FF9800",
		color: "#ffffff",
		maxWidth: 250,
		textAlign: "center",
		borderRadius: 5,
		padding: 3,
		margin: "0 auto",
		marginBottom: 30,
	},
	title: {
		fontSize: 17,
		textAlign: "center",
		marginBottom: 10,
		marginTop: 15,
		fontWeight: 500,
	},
	decisionBtn: {
		background: "#78a971",
		color: "#ffffff",
		paddingLeft: 50,
		paddingRight: 50,
		margin: "0 auto",
		display: "block",
		marginTop: 10,
		marginBottom: 40,
		"&:hover": {
			background: "#78a971",
		},
	},
});

const App: React.FC = () => {
	const classes = useStyles();

	const [comments, setComments] = useState<CommentProps[]>(fakeApiComments);
	const [forceClean, setForceClean] = useState<number>();
	const [currentComment, setCurrentComment] = useState<string>();

	const leaveComment = useCallback(() => {
		if (currentComment) {
			setComments([
				{
					date: "23.09.2020 20:31",
					text: currentComment,
					user: {
						id: 2,
						name: "Тест Тестов",
					},
					decision: {
						label: "Решение не принято",
					},
				},
				...comments,
			]);
			setForceClean(+new Date());
			setCurrentComment(undefined);

			console.log(currentComment);
		}
	}, [currentComment, comments]);

	return (
		<CardLayout>
			<Typography variant="h3" className={classes.title}>
				Основание для принятия решения по активу 201212000932
			</Typography>
			<div className={classes.badge}>Актив в пуле</div>
			<RichTextEditor
				onChange={setCurrentComment}
				forceClean={forceClean}
			/>
			<Button
				variant="contained"
				size="small"
				className={classes.decisionBtn}
				onClick={leaveComment}
			>
				Принять решение по активу
			</Button>
			<Comments data={comments} selfUserId={2} />
		</CardLayout>
	);
};

export default App;
