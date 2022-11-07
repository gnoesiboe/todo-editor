import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';
import { startRegexGlobal } from '../../../../model/TodoFactory';

export const startStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(startRegexGlobal, contentBlock, callback);
};
