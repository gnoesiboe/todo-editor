import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import { todoStrategy } from './strategy/todoStrategy';
import Todo from '../components/Todo';

export type StrategyCallback = (start: number, end: number) => void;

export type Strategy = (
    contentBlock: ContentBlock,
    callback: StrategyCallback,
    contentState: ContentState,
) => void;

export function createEditorDecorator(): CompositeDecorator {
    return new CompositeDecorator([
        {
            strategy: todoStrategy,
            component: Todo,
        },
    ]);
}
