import { createMuiTheme } from "@material-ui/core";

export const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#0088bb",
		},
	},
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: 13,
				fontWeight: 400,
			}
		}
	}
});
