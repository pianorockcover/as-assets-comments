import { LinearProgress } from "@material-ui/core";
import React from "react";

interface LoaderProps {
	className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => (
	<LinearProgress className={className} />
);
