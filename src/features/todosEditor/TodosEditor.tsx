import { FC, useEffect, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import useHandleKeyCommands from './hooks/useHandleKeyCommands';
import { useTodosContext } from '../../context/todos/TodosContext';
import { useFilterContext } from '../../context/filter/FilterContext';
import { resolveBlockClassName } from './resolver/blockClassNameResolver';
import useForceEditorRerender from './hooks/useForceEditorRerender';

export type OnEditorChangeHandler = (editorState: EditorState) => void;

const TodosEditor: FC = () => {
    const ref = useRef<any>(null);

    const { editorState, setEditorState } = useTodosContext();

    const { hiddenProjects, hiddenTags } = useFilterContext();

    // We need the editor to re-render to re-apply the styles, as these might change due
    // to changes in active filters
    useForceEditorRerender(hiddenProjects, hiddenTags);

    useEffect(() => {
        ref.current.focus();
    }, []);

    const onChange: OnEditorChangeHandler = (editorState): void => {
        setEditorState(editorState);
    };

    const handleKeyCommands = useHandleKeyCommands(onChange);

    return (
        <div className="bg-gray-200 p-4 font-mono text-sm">
            <Editor
                ref={ref}
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommands}
                blockStyleFn={(block) =>
                    resolveBlockClassName(block, hiddenProjects, hiddenTags)
                }
                onTab={(event) => event.preventDefault()}
            />
        </div>
    );
};

export default TodosEditor;
