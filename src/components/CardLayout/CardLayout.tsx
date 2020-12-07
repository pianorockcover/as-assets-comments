import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { getIcon } from "../icons";

const useStyles = makeStyles({
	shadow: {},
	cardLayoutWrapper: {
		margin: "0 auto",
		maxWidth: 800,
		minHeight: "100vh",
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		background: "#eef2f4",
	},
	cardLayout: {},
	close: {},
	closeIcon: {},
});

const CloseIcon = getIcon("Close");

// TODO: доделать
export const CardLayout: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardLayoutWrapper}>
			{/* <div className={classes.close}>
				<IconButton size="small" className={classes.closeIcon}>
					<CloseIcon />
				</IconButton>
			</div> */}
			<div className={classes.shadow} />
			<div className={classes.cardLayout}>{children}</div>
		</div>
	);
};
