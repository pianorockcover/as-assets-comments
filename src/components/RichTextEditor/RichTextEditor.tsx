import { makeStyles } from "@material-ui/core/styles";
import React, {
	createRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Editor, EditorState } from "draft-js";
import { RichTextEditorTools } from "./RichTextEditorTools";
import clsx from "clsx";
import { richTextEditorDecorators } from "./decorators";
import {
	convertMarkdownToDraft,
	convertDraftToMarkdown,
} from "./draftMarkdown";

const border = "1px solid #d2d2d2";

const useStyles = makeStyles({
	richEditorWrapper: {
		background: "#ffffff",
		border,
		marginBottom: 20,
		position: "relative",
		transition: "border .2s ease-in-out",
		paddingBottom: 22,
		minWidth: 450,
	},
	richEditorWrapperFocus: {
		borderColor: "#4dd0e1",
	},
	richEditorArea: {
		padding: 10,
		height: 200,
		overflowY: "auto",
		transition: "box-shadow .2s ease-in-out",
	},
	richEditorAreaFocus: {
		boxShadow: "inset 0px 0px 10px #caefff",
	},
	toolsUnfocus: {
		opacity: 0.95,
		transition: "opacity .2s ease-in-out",
	},
	amountBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		textAlign: "right",
		fontSize: 11,
		background: "#eeeeee",
		borderTop: "1px solid #d2d2d2",
		padding: 3,
		zIndex: 1,
		color: "#4c4b4b",
	},
});

const styleMap = {
	BOLD: {
		fontWeight: 600,
	},
	LINK: {
		color: "#0088bb",
	},
};

interface RichTextEditorProps {
	/**
	 * Обработчик изменения текста
	 */
	onChange: (value: string) => void;
	/**
	 * Дефолтное значение
	 */
	defaultValue?: string;
	/**
	 * Редактор очищается при изменении этого свойства
	 */
	forceClean?: number;
	/**
	 * Подсказка
	 */
	placeholder?: string;
	/**
	 * CSS-класс
	 */
	className?: string;
}

/**
 * Расширенный редактор текста. Экспортирует строку в формате Markdown.
 * - Фреймворк для создания редактора: [Draft.js](https://draftjs.org/)
 * - Конвертер стейта Draft.js в Markdown: [markdown-draft-js](https://www.npmjs.com/package/markdown-draft-js)
 *
 * @param {RichTextEditorProps} props - св-ва компонента
 * @returns {JSX.Element}
 */
export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
	({
		defaultValue,
		forceClean,
		placeholder,
		className,
		...props
	}: RichTextEditorProps): JSX.Element => {
		const classes = useStyles();

		const [editorState, setEditorState] = useState(
			EditorState.createWithContent(
				convertMarkdownToDraft(defaultValue),
				richTextEditorDecorators
			)
		);

		const [symbolsAmount, setSymbolsAmount] = useState<number>(0);

		const onChange = useCallback(
			(nextEditorState: EditorState) => setEditorState(nextEditorState),
			[]
		);

		const ref = createRef<any>();
		const [focus, setFocus] = useState<boolean>();

		const onBlur = useCallback(() => setFocus(false), [editorState]);

		const onClickArea = useCallback(() => {
			if (ref && ref.current) {
				ref.current.focus();
				setFocus(true);
			}
		}, [ref]);

		useEffect(() => {
			if (forceClean) {
				setEditorState(
					EditorState.createEmpty(richTextEditorDecorators)
				);
			}
		}, [forceClean]);

		useEffect(() => {
			const markdownString = convertDraftToMarkdown(editorState);
			props.onChange(markdownString);
			setSymbolsAmount(markdownString.length);
		}, [editorState]);

		return (
			<div
				className={clsx(
					classes.richEditorWrapper,
					{
						[classes.richEditorWrapperFocus]: focus,
					},
					className
				)}
			>
				<RichTextEditorTools
					editorState={editorState}
					setEditorState={setEditorState}
					className={!focus ? classes.toolsUnfocus : undefined}
				/>
				<div
					className={clsx(classes.richEditorArea, {
						[classes.richEditorAreaFocus]: focus,
					})}
					onClick={onClickArea}
				>
					<Editor
						editorState={editorState}
						onChange={onChange}
						spellCheck={true}
						customStyleMap={styleMap}
						onBlur={onBlur}
						ref={ref}
						placeholder={placeholder}
					/>
				</div>
				<span className={classes.amountBar}>
					Всего симолов: {symbolsAmount}
				</span>
			</div>
		);
	}
);
