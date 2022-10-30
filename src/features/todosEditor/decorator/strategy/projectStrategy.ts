import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';

export const projectStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(/#[^ ]+/g, contentBlock, callback);
};
