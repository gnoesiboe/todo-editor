import { FC, MouseEventHandler } from 'react';
import { RotateCcw, RotateCw } from 'react-feather';
import TimeTravelButton from './components/TimeTravelButton';
import { useTodosContext } from '../../context/todos/TodosContext';
import { EditorState } from 'draft-js';

const UndoRedo: FC = () => {
    const { editorState, setEditorState } = useTodosContext();

    const onUndoClick: MouseEventHandler<HTMLButtonElement> = () => {
        setEditorState(EditorState.undo(editorState));
    };

    const onRedoClick: MouseEventHandler<HTMLButtonElement> = () => {
        setEditorState(EditorState.redo(editorState));
    };

    return (
        <ul className="flex gap-1">
            <li>
                <TimeTravelButton
                    title="undo"
                    icon={RotateCcw}
                    onClick={onUndoClick}
                />
            </li>
            <li>
                <TimeTravelButton
                    title="redo"
                    icon={RotateCw}
                    onClick={onRedoClick}
                />
            </li>
        </ul>
    );
};

export default UndoRedo;
