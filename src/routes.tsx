import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import AppGraph from "./AppGraph";

const basePath = "/as-assets/build";

export const Routes: React.FC = () => (
	<Router>
		<Switch>
			<Route path={`${basePath}/graph`} component={AppGraph} exact={true} />
			<Route path={`${basePath}/`} component={App} exact={true} />
		</Switch>
	</Router>
);
