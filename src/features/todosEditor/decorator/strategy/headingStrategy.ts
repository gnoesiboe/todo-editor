import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';

export const headingStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(/^# [^ ]+/g, contentBlock, callback);
};
