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
import { notesStrategy } from './strategy/notesStrategy';
import Notes from '../components/Notes';
import { checkboxStrategy } from './strategy/checkboxStrategy';
import Checkbox from '../components/Checkbox';
import InlineCode from '../components/InlineCode';
import { inlineCodeStrategy } from './strategy/inlineCodeStrategy';
import { deadlineStrategy } from './strategy/deadlineStrategy';
import Deadline from '../components/Deadline';
import { startStrategy } from './strategy/startStrategy';
import { Star } from 'react-feather';
import Start from '../components/Start';

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
            strategy: checkboxStrategy,
            component: Checkbox,
        },
        {
            strategy: deadlineStrategy,
            component: Deadline,
        },
        {
            strategy: startStrategy,
            component: Start,
        },
        {
            strategy: linkStrategy,
            component: Link,
        },
        {
            strategy: notesStrategy,
            component: Notes,
        },
        {
            strategy: inlineCodeStrategy,
            component: InlineCode,
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
