import { ContentBlock } from 'draft-js';
import { StrategyCallback } from '../../decoratorFactory';

export function findWithRegex(
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
