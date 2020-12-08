import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { customTheme } from "./customTheme";
import { Routes } from "./routes";

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<ThemeProvider theme={customTheme}>
			<Routes />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
