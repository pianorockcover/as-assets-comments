import { makeStyles, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import React, { useMemo } from "react";
import { getIcon } from "../icons";
import { TaskHistoryBlockInfo } from "./interface";

const useStyles = makeStyles({
	taskHistoryWrapper: {},
	taskHistory: {
		padding: 30,
		border: "1px solid #d2d2d2",
		borderRight: 0,
		position: "relative",
		"&:not(:nth-child(1))": {
			marginTop: -1,
		},
	},
	taskHistoryBlock: {},
	date: {
		position: "absolute",
		top: -10,
		width: 100,
		textAlign: "center",
		background: "#cacaca",
		color: "#ffffff",
		padding: 3,
		borderRadius: 7,
		left: "calc(50% - 50px)",
	},
	icon: {},
	success: {},
	warnin: {},
	info: {},
	error: {},
	decision: {},
});

const icons: {
	[key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
} = {
	info: getIcon("Info"),
	warning: getIcon("Warning"),
	error: getIcon("Error"),
	success: getIcon("CheckCircle"),
};

interface TaskHistoryProps {
	/**
	 * Данные
	 * TODO: доделать запрос с сервера
	 */
	data: {
		/**
		 * Список событий за день
		 */
		items: TaskHistoryBlockInfo[];
		/**
		 * Дата
		 */
		date: string;
	}[];
}

/**
 * Граф с историей изменений в задаче
 *
 * @param {TaskHistoryProps} props
 * @returns {JSX.Element}
 */
export const TaskHistory: React.FC<TaskHistoryProps> = ({ data }) => {
	const classes = useStyles();

	return (
		<>
			{data.map(({ date, items }, i) => (
				<div className={classes.taskHistory} key={i}>
					<div className={classes.date}>{date}</div>
					{items.map(({ text, decision, type }, j) => {
						const IconComponent = icons[type];

						const decisionBy =
							decision &&
							`Решение ${
								decision.by === "controller"
									? "контролера"
									: "оператора"
							}`;

						const typeClass = classes[type as keyof typeof classes];

						return (
							<div className={classes.taskHistoryBlock} key={j}>
								{IconComponent && (
									<IconComponent
										className={clsx(
											classes.icon,
											typeClass
										)}
									/>
								)}
								{decision && (
									<div>
										<div className={classes.decision}>
											{decisionBy}:{" "}
											<span className={typeClass}>
												{decision.label} {decision.date}
											</span>
										</div>
									</div>
								)}
								{text}
							</div>
						);
					})}
				</div>
			))}
		</>
	);
};
