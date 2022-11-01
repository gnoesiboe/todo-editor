import { ContentBlock } from 'draft-js';
import { StrategyCallback } from '../../decoratorFactory';

export function findWithRegex(
    regex: RegExp,
    contentBlock: ContentBlock,
    callback: StrategyCallback,
) {
    const text = contentBlock.getText();

    let matches: RegExpExecArray | null;
    let start: number;

    while ((matches = regex.exec(text)) !== null) {
        start = matches.index;

        callback(start, start + matches[0].length);
    }
}
