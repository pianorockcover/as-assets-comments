import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CommentProps, SingleComment } from "./Comment";
import { generateComment } from "./generateComment";

const useStyles = makeStyles({
	commentsWrapper: {
		marginBottom: 20,
	},
	comments: {
		marginBottom: 10,
		maxHeight: 700,
		overflowY: "auto",
		overflowX: "hidden",
		paddingTop: 10,
		paddingRight: 20,
		paddingBottom: 15,
	},
});

const paginationSize = 5;
const tmpTotalCount = 15;

/**
 * Формат ответа от сервера, возвращающего массив комментариев
 */
interface CommentsList {
	rows: CommentProps[];
	totalCount: number;
}

interface CommentsProps {
	/**
	 * Массив комментариев.
	 * TODO: только для тестов.
	 * В проекте комментарии будут запрашиваться самим комопонентом с сервера.
	 */
	data: CommentProps[];
	/**
	 * CSS-класс
	 */
	className?: string;
}

/**
 * Список комментариев
 *
 * @param {CommentsProps} props
 * @returns {JSX.Element}
 */
export const Comments: React.FC<CommentsProps> = React.memo(
	({ data, className }) => {
		const classes = useStyles();

		const [commentsList, setCommentsList] = useState<CommentsList>({
			rows: data,
			totalCount: tmpTotalCount,
		});

		const [animated, setAnimated] = useState<boolean>(false);

		useEffect(() => {
			setCommentsList({
				rows: data,
				totalCount: tmpTotalCount,
			});
			setAnimated(true);
		}, [data]);

		const showMoreDisabled = useMemo(
			() => commentsList.rows.length >= commentsList.totalCount,
			[commentsList]
		);

		const onShowMore = useCallback(() => {
			// TODO: временно, заглушка! Здесь запрос на сервер!
			const toAdd: CommentProps[] = new Array(paginationSize)
				.fill(null)
				.map(generateComment);

			setCommentsList({
				rows: [...commentsList.rows, ...toAdd],
				totalCount: tmpTotalCount,
			});
			setAnimated(false);
		}, [commentsList]);

		const showLessDisabled = useMemo(
			() => commentsList.rows.length <= paginationSize,
			[commentsList]
		);

		const onShowLess = useCallback(() => {
			// TODO: временно, заглушка!
			setCommentsList({
				rows: commentsList.rows.slice(0, -paginationSize),
				totalCount: tmpTotalCount,
			});
			setAnimated(false);
		}, [commentsList]);

		return (
			<div className={clsx(classes.commentsWrapper, className)}>
				<div className={classes.comments}>
					<React.Fragment>
						{commentsList.rows.map((comment, i) => (
							<SingleComment
								{...comment}
								// Чтобы обеспечить правильную перерисовку комментария
								// при добавлении нового элемента в стек
								key={`${i}-${+new Date()}`}
								index={i}
								firstAnimated={animated}
							/>
						))}
					</React.Fragment>
				</div>
				{commentsList.totalCount && (
					<>
						<Button
							color="primary"
							onClick={onShowMore}
							disabled={showMoreDisabled}
						>
							+ Показать больше
						</Button>
						<Button
							color="primary"
							onClick={onShowLess}
							disabled={showLessDisabled}
						>
							- Скрыть
						</Button>
					</>
				)}
			</div>
		);
	}
);
