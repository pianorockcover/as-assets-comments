import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import App from "./App";
import AppGraph from "./AppGraph";

export const Routes: React.FC = () => (
	<HashRouter>
		<Switch>
			<Route path="/" component={App} exact={true} />
			<Route path="/graph" component={AppGraph} exact={true} />
		</Switch>
	</HashRouter>
);
