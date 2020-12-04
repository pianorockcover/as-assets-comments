import { Fade, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, {
	createRef,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import ReactMarkdown from "react-markdown";
import { getIcon } from "../icons";
import { getCommentAvatarData } from "./getCommentAvatar";

const useStyles = makeStyles({
	comment: {
		marginBottom: 25,
		"&:nth-last-child(1)": {
			marginBottom: 0,
		},
		position: "relative",
		paddingLeft: 60,

		"&:before": {
			content: "''",
			display: "block",
			position: "absolute",
			width: "calc(100% - 60px)",
			height: 1,
			background: "#d4d4d4",
			top: 10,
			zIndex: 1,
		},

		"&:after": {
			content: "''",
			position: "absolute",
			width: 5,
			height: 5,
			background: "#d4d4d4",
			top: 8,
			left: 60,
			right: "auto",
		},
	},
	commentArea: {
		padding: 10,
		background: "#ffffff",
		borderRadius: 5,
		boxShadow: "2px 4px 5px 2px #dcdcdc80",
	},
	author: {
		fontWeight: 500,
		color: "#0088bb",
	},
	date: {
		opacity: 0.8,
		marginBottom: 10,
		color: "#5d5d5d",
		fontSize: 13,
	},
	text: {
		overflow: "hidden",
		position: "relative",
		"& p": {
			marginTop: 0,
		},
	},
	textHidden: {
		"&:after": {
			position: "absolute",
			content: "''",
			background: "linear-gradient(to top, #ffffff, transparent)",
			width: "100%",
			height: 40,
			display: "block",
			bottom: 0,
			zIndex: 1,
		},
	},
	readMoreButton: {
		bottom: 0,
		position: "absolute",
		marginLeft: "calc(50% - 15px)",
		zIndex: 2,
		transition: "transform .3s ease-in-out, background .2s linear",
		color: "#252733",
		background: "rgb(16, 16, 16, 0.1)",
	},
	readMoreButtonClose: {
		transform: "rotate(180deg)",
		position: "static",
		background: "transparent",
	},
	avatar: {
		position: "absolute",
		background: "#636e72",
		color: "#ffffff",
		width: 50,
		height: 50,
		borderRadius: "100%",
		left: 0,
		top: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 20,
		fontWeight: 400,
	},
	avatarSelf: {
		border: "3px solid #ffffff",

		"&:after": {
			content: "''",
			width: 14,
			height: 14,
			display: "block",
			position: "absolute",
			bottom: -4,
			right: 0,
			borderRadius: "100%",
			background: "#03A9F4",
			border: "2px solid #ffffff",
		},
	},
	decision: {
		color: "#636e72",
		width: "fit-content",
		padding: 3,
		fontSize: 11,
		marginLeft: 20,
		marginBottom: 8,
		borderRadius: 5,
		paddingLeft: 10,
		paddingRight: 10,
		position: "relative",
		zIndex: 2,
		background: "#eef2f4",
		border: "1px solid",
	},
	decisionSuccess: {
		color: "#8BC34A",
		border: "1px solid",
	},
	decisionError: {
		color: "#f44336",
		border: "1px solid",
	},
});

const ArrowIcon = getIcon("ExpandMore");

/**
 * Максимальная высота блока с текстом комментария
 */
const maxHeight = 100;

export interface CommentProps {
	/**
	 * Содержимое коментария в формате Markdown
	 */
	text: string;
	/**
	 * Дата
	 */
	date: string;
	/**
	 * Индекс во внешнем массиве комментариев
	 */
	index?: number;
	/**
	 * Анимировать коммент, если он первый в списке
	 */
	firstAnimated?: boolean;
	/**
	 * Решение
	 */
	decision?: {
		/**
		 * Успех/неуспех
		 */
		success?: boolean;
		/**
		 * Текст решения
		 */
		label: string;
	};
	/**
	 * Id текущего пользователя
	 */
	selfUserId?: number;
	/**
	 * Пользователь, оставивший коммент
	 */
	user: {
		/**
		 * Id
		 */
		id: number;
		/**
		 * Имя
		 */
		name: string;
	};
}

/**
 * Компонент для отображения комментария
 * - Пакет для рендеринга html из Markdown: [react-markdown](https://www.npmjs.com/package/react-markdown)
 *
 * @param {CommentProps} props
 * @returns {JSX.Element}
 */
export const SingleComment: React.FC<CommentProps> = React.memo(
	({
		date,
		text,
		index,
		firstAnimated,
		decision,
		selfUserId,
		user,
	}: CommentProps) => {
		const classes = useStyles();

		const ref = createRef<HTMLDivElement>();

		const [hidden, setHidden] = useState<boolean>();
		const [needReadMoreButton, setNeedReadMoreButton] = useState<boolean>();

		useEffect(() => {
			if (ref && ref.current) {
				const initialHeight = ref.current.getBoundingClientRect()
					.height;

				if (hidden === undefined && initialHeight > maxHeight) {
					setHidden(true);
					setNeedReadMoreButton(true);
				}
			}
		}, []);

		const toggleHidden = useCallback(() => setHidden(!hidden), [hidden]);

		const height = useMemo(() => {
			return hidden ? maxHeight : undefined;
		}, [hidden]);

		const animationTimeout = useMemo(
			() => (firstAnimated && index === 0 ? 1000 : 0),
			[index, firstAnimated]
		);

		const avatar = useMemo(() => getCommentAvatarData(user.name), [
			user.name,
		]);

		return (
			<Fade in={true} timeout={animationTimeout}>
				<div className={clsx(classes.comment)}>
					{decision && (
						<div
							className={clsx(classes.decision, {
								[classes.decisionSuccess]:
									decision && decision.success,
								[classes.decisionError]:
									decision && decision.success === false,
							})}
						>
							{decision.label}
						</div>
					)}
					<div
						className={clsx(classes.avatar, {
							[classes.avatarSelf]: selfUserId === user.id,
						})}
						style={{ backgroundColor: avatar.color }}
					>
						{avatar.symbol}
					</div>
					<div className={classes.commentArea}>
						<div className={classes.author}>{user.name}</div>
						<div className={classes.date}>{date}</div>
						<div
							className={clsx(classes.text, {
								[classes.textHidden]: hidden,
							})}
							ref={ref}
							style={{ maxHeight: height }}
						>
							<ReactMarkdown>{text}</ReactMarkdown>
							{needReadMoreButton && (
								<IconButton
									size="small"
									className={clsx(classes.readMoreButton, {
										[classes.readMoreButtonClose]: !hidden,
									})}
									onClick={toggleHidden}
								>
									{ArrowIcon && <ArrowIcon />}
								</IconButton>
							)}
						</div>
					</div>
				</div>
			</Fade>
		);
	}
);
