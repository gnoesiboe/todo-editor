import { useTodosContext } from '../context/todos/TodosContext';

export default function useExtractMatchesFromEditorState(
    pattern: RegExp,
): string[] {
    const { plainTextEditorState } = useTodosContext();

    const lines = plainTextEditorState.split('\n');

    const matches: string[] = [];

    lines.forEach((line) => {
        const match = line.match(pattern);

        if (match) {
            matches.push(...match);
        }
    });

    return matches.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
    });
}
