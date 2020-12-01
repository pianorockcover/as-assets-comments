import { IconButton, Zoom } from "@material-ui/core";
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

const useStyles = makeStyles({
	comment: {
		marginBottom: 10,
		background: "#e8e8e8",
		padding: 10,
		borderRadius: 5,
	},
	author: {
		fontWeight: 500,
	},
	date: {
		opacity: 0.8,
		marginBottom: 10,
	},
	text: {
		overflow: "hidden",
		position: "relative",
	},
	textHidden: {
		"&:after": {
			position: "absolute",
			content: "''",
			background: "linear-gradient(to top, #e8e8e8, transparent)",
			width: "100%",
			height: 30,
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
		transition: "transform .3s linear",
		color: "#252733",
	},
	readMoreButtonClose: {
		transform: "rotate(180deg)",
		position: "static",
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
	 * Автор
	 */
	author: string;
	/**
	 * Дата
	 */
	date: string;
	/**
	 * Индекс в списке комментариев
	 */
	index?: number;
	/**
	 * Если true - комментарий будет анимирован
	 */
	showLastComment?: boolean;
	/**
	 * Если True - комментарий будет показан без анимации
	 */
	visible?: boolean;
	/**
	 * Длительность анимации
	 */
	animationTimeout?: number;
}

/**
 * Компонент для отображения комментария
 * - Пакет для рендеринга html из Markdown: [react-markdown](https://www.npmjs.com/package/react-markdown)
 *
 * @param {CommentProps} props
 * @returns {JSX.Element}
 */
export const SingleComment: React.FC<CommentProps> = React.memo(
	({ author, date, text, ...props }: CommentProps) => {
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
		}, [ref, hidden]);

		const toggleHidden = useCallback(() => setHidden(!hidden), [hidden]);

		const height = useMemo(() => (hidden ? maxHeight : undefined), [
			hidden,
		]);

		return (
			<div className={classes.comment}>
				<div className={classes.author}>{author}</div>
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
		);
	}
);
