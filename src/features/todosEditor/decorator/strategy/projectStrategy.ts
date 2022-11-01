import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';
import { projectRegex } from '../../../../model/TodoFactory';

export const projectStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(projectRegex, contentBlock, callback);
};
