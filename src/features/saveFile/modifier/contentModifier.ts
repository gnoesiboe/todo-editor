import {
    RelativeDateDescription,
    transformRelativeDateDescriptionToFormattedFixedDate,
} from '../../../utilities/dateTimeUtilities';
type ContentModifier = (content: string) => string;

const relativeDateToFixedDateModifier: ContentModifier = (
    content: string,
): string => {
    const transformMapping: Array<
        [prefix: string, relativeDateDescription: RelativeDateDescription]
    > = [
        ['dl', 'tomorrow'],
        ['st', 'tomorrow'],
        ['dl', 'monday'],
        ['st', 'monday'],
        ['dl', 'tuesday'],
        ['st', 'tuesday'],
        ['dl', 'wednesday'],
        ['st', 'wednesday'],
        ['dl', 'thursday'],
        ['st', 'thursday'],
        ['dl', 'friday'],
        ['st', 'friday'],
        ['dl', 'saturday'],
        ['st', 'saturday'],
        ['dl', 'sunday'],
        ['st', 'sunday'],
    ];

    let updatedContent = content;

    for (const [prefix, relativeDateDescription] of transformMapping) {
        const formattedFixedDate =
            transformRelativeDateDescriptionToFormattedFixedDate(
                relativeDateDescription,
            );

        updatedContent = updatedContent.replace(
            `${prefix}:${relativeDateDescription}`,
            `${prefix}:${formattedFixedDate}`,
        );
    }

    return updatedContent;
};

const modifiers: ContentModifier[] = [relativeDateToFixedDateModifier];

export function modifyContentBeforeSave(content: string): string {
    let modifiedContent: string = content;

    for (const modify of modifiers) {
        modifiedContent = modify(modifiedContent);
    }

    return modifiedContent;
}
