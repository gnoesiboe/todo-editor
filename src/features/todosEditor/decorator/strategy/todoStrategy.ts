import { Strategy, StrategyCallback } from '../decoratorFactory';
import { ContentBlock } from 'draft-js';

export const todoStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
): void => {
    const regex = /\* \[[ x-]{1,1}] .+/g;

    findWithRegex(regex, contentBlock, callback);
};

function findWithRegex(
    regex: RegExp,
    contentBlock: ContentBlock,
    callback: StrategyCallback,
) {
    const text = contentBlock.getText();

    let matchArr, start;

    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;

        callback(start, start + matchArr[0].length);
    }
}
