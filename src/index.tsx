import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { customTheme } from "./customTheme";

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<ThemeProvider theme={customTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
