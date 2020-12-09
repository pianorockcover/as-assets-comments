import { makeStyles } from "@material-ui/core";
import React from "react";
import { TaskHistory } from "./components/TaskHistory/TaskHistory";
import data from "./fake-api-graph.json";

const useStyles = makeStyles({
	appWrapper: {
		margin: "0 auto",
        width: 900,
        paddingTop: 10,
		minHeight: "100vh",
	},
	"@global": {
		body: {
			background: "#ffffff",
		},
	},
});

const AppGraph: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.appWrapper}>
			<TaskHistory data={data as any} />
		</div>
	);
};

export default AppGraph;
