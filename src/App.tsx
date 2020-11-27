import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { RichTextEditor } from "./components/RichTextEditor/RichTextEditor";
import { noop } from "lodash";
import { makeStyles } from "@material-ui/core/styles";

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
	const [comments, setComments] = useState();

	return (
		<div className={classes.appWrapper}>
			<RichTextEditor defaultValue="" onChange={noop} />
			<Button variant="contained" color="primary">
				Оставить комментарий
			</Button>
		</div>
	);
}

export default App;
