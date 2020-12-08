import React from "react";
import { CardLayout } from "./components/CardLayout/CardLayout";
import { TaskHistory } from "./components/TaskHistory/TaskHistory";
import data from "./fake-api-graph.json";

const AppGraph: React.FC = () => {
	return (
		<CardLayout>
			<TaskHistory data={data as any} />
		</CardLayout>
	);
};

export default AppGraph;
