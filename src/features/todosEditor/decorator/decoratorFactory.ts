import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import { projectStrategy } from './strategy/projectStrategy';
import Project from '../components/Project';
import { tagStrategy } from './strategy/tagStrategy';
import Tag from '../components/Tag';
import { headingStrategy } from './strategy/headingStrategy';
import Heading from '../components/Heading';
import { separatorStrategy } from './strategy/separatorStrategy';
import Separator from '../components/Separator';
import { linkStrategy } from './strategy/linkStrategy';
import Link from '../components/Link';

export type StrategyCallback = (start: number, end: number) => void;

export type Strategy = (
    contentBlock: ContentBlock,
    callback: StrategyCallback,
    contentState: ContentState,
) => void;

export function createEditorDecorator(): CompositeDecorator {
    return new CompositeDecorator([
        {
            strategy: separatorStrategy,
            component: Separator,
        },
        {
            strategy: headingStrategy,
            component: Heading,
        },
        {
            strategy: linkStrategy,
            component: Link,
        },
        {
            strategy: projectStrategy,
            component: Project,
        },
        {
            strategy: tagStrategy,
            component: Tag,
        },
    ]);
}
