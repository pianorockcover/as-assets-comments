import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
	link: {
		color: "#0088bb",
		textDecoration: "underline",
	},
});

export const LinkPreview: React.FC<any> = (props) => {
	const classes = useStyles();

	const { url } = props.contentState.getEntity(props.entityKey).getData();

	return (
		<a className={classes.link} href={url}>
			{props.children}
		</a>
	);
};
