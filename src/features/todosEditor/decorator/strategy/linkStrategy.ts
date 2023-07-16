import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';

export const linkStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(/\[[^\]]{2,}]\([^ ]+\)/gi, contentBlock, callback);
};
