import { Strategy } from '../decoratorFactory';
import { findWithRegex } from './utilities/findWithRegex';

export const checkboxStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    findWithRegex(/[ ]{0,}- \[[ x-]{1,1}]/g, contentBlock, callback);
};
