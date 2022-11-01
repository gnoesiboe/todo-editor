import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';
import { tagRegex } from '../../../../model/TodoFactory';

export const tagStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(tagRegex, contentBlock, callback);
};
