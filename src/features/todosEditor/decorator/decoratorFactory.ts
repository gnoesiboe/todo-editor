import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import { todoStrategy } from './strategy/todoStrategy';
import Todo from '../components/Todo';
import { projectStrategy } from './strategy/projectStrategy';
import Project from '../components/Project';
import CompoundDecorator from './CompoundDecorator';
import { tagStrategy } from './strategy/tagStrategy';
import Tag from '../components/Tag';

export type StrategyCallback = (start: number, end: number) => void;

export type Strategy = (
    contentBlock: ContentBlock,
    callback: StrategyCallback,
    contentState: ContentState,
) => void;

export function createEditorDecorator(): CompositeDecorator {
    const decorators = [
        {
            strategy: projectStrategy,
            component: Project,
        },
        {
            strategy: tagStrategy,
            component: Tag,
        },
        {
            strategy: todoStrategy,
            component: Todo,
        },
    ];

    return new CompoundDecorator(decorators);

    // return new CompositeDecorator([
    //
    // ]);
}
