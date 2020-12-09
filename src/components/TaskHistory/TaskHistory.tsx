import { makeStyles, Slide, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import { isSameDay, parse } from "date-fns";
import { get } from "lodash";
import React from "react";
import { getIcon } from "../icons";
import { TaskHistoryBlockInfo } from "./interface";

const useStyles = makeStyles({
	taskHistoryWrapper: {
		marginBottom: 10,
		paddingLeft: 20,
		paddingTop: 15,
		overflow: "hidden",
	},
	taskHistory: {
		padding: 30,
		border: "1px solid #d2d2d2",
		borderRight: 0,
		position: "relative",
		paddingLeft: 70,
		paddingBottom: 0,
		"&:not(:nth-child(1))": {
			marginTop: -1,
		},
	},
	taskHistoryBlock: {
		position: "relative",
		"&:before": {
			content: "''",
			position: "absolute",
			display: "block",
			width: 80,
			height: 1,
			background: "#d2d2d2",
			left: -80,
			top: 15,
		},
	},
	date: {
		position: "absolute",
		top: -15,
		textAlign: "center",
		background: "#cacaca",
		color: "#ffffff",
		padding: 3,
		minWidth: 120,
		paddingLeft: 25,
		paddingRight: 25,
		borderRadius: 15,
		left: "calc(50% - 50px)",
	},
	icon: {
		fontSize: 50,
		position: "absolute",
		zIndex: 1,
		background: "#ffffff",
		borderRadius: "100%",
		padding: 0,
		lineHeight: 0,
		left: -95,
		top: -10,
	},
	success: {
		color: "#9cd06e",
	},
	warning: {
		color: "#face87",
	},
	info: {
		color: "#01bbee",
	},
	error: {
		color: "#ff575b",
	},
	decisionLabel: {
		fontWeight: 500,
	},
	today: {
		background: "#01bbee",
	},
	bubble: {
		border: "1px solid #d2d2d2",
		background: "#f1f1f1",
		padding: 10,
		borderRadius: 6,
		marginBottom: 35,
	},
});

const icons: {
	[key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
} = {
	info: getIcon("Info"),
	warning: getIcon("Warning"),
	error: getIcon("Error"),
	success: getIcon("CheckCircle"),
};

const getAnimationTimeout = (i: number, j: number) => (i + j + 1) * 200;

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
		<div className={classes.taskHistoryWrapper}>
			{data.map(({ date, items }, i) => (
				<div className={classes.taskHistory} key={i}>
					<div
						className={clsx(classes.date, {
							[classes.today]: isSameDay(
								parse(date, "dd.MM.yyyy", new Date()),
								new Date()
							),
						})}
					>
						{date}
					</div>
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
							<Slide
								in={true}
								direction="right"
								timeout={getAnimationTimeout(i, j)}
							>
								<div
									className={classes.taskHistoryBlock}
									key={j}
								>
									{IconComponent && (
										<IconComponent
											className={clsx(
												classes.icon,
												typeClass
											)}
										/>
									)}
									<div className={classes.bubble}>
										{decision && (
											<>
												{decisionBy}:{" "}
												<span
													className={clsx(
														typeClass,
														classes.decisionLabel
													)}
												>
													{decision.label}{" "}
												</span>
												<div>
													{get(decision, "user.name")}
													: {decision.date}
												</div>
											</>
										)}
										{text}
									</div>
								</div>
							</Slide>
						);
					})}
				</div>
			))}
		</div>
	);
};
