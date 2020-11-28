import { Fade, IconButton, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { getIcon } from "../icons";

const useStyles = makeStyles({
	linkPicker: {
		top: 33,
		left: 0,
		zIndex: 2,
		position: "absolute",
		width: 165,
		borderBottom: "1px solid #d2d2d2",
		background: "#fafdff",
		borderRight: "1px solid #d2d2d2",
		boxShadow: "1px 1px 4px 0px #e4e1e1",
	},
});

const CloseIcon = getIcon("Close");

interface LinkPickerProps {
	open?: boolean;
	createLink: (symbol: string) => void;
}

export const LinkPicker: React.FC<LinkPickerProps> = ({ open, createLink }) => {
	const classes = useStyles();

	return (
		<Fade in={open}>
			<div className={classes.linkPicker}>
				<IconButton size="small">
					<TextField size="small" label="http://" />
					{CloseIcon && <CloseIcon />}
				</IconButton>
			</div>
		</Fade>
	);
};
