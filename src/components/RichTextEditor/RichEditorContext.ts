import { EditorState } from "draft-js";
import React from "react";

interface RichEditorContextProps {
	/**
	 * Стейт редактора текстов
	 */
	editorState?: EditorState;
	/**
	 * Ф-я изменения стейта редактора текстов
	 */
	setEditorState?: (editorState: EditorState) => void;
}

/**
 * Контекст расширенного редактора текстов
 */
export const RichEditorContext = React.createContext<RichEditorContextProps>(
	{}
);
