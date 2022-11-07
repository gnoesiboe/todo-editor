import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';
import { deadlineRegexGlobal } from '../../../../model/TodoFactory';

export const deadlineStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(deadlineRegexGlobal, contentBlock, callback);
};
