import Todo, { TodoStatus } from './Todo';
import { parseDateDescription } from '../utilities/dateTimeUtilities';

export const todoRegex = /^[ ]{0,}- \[([ x-]{1,1})] *.*$/i;
export const todoPrefixRegex = /^[ ]{0,}- \[([ x-]{1,1})]/;
export const projectRegex = /#([^ ]+)/g;
export const tagRegex = /@([^ ]+)/g;
export const startRegexGlobal = /st:[^ ]+/gi;
export const deadlineRegexGlobal = /dl:[^ ]+/gi;

function determineStatus(text: string): TodoStatus {
    const match = text.match(todoRegex);

    if (!match) {
        return 'open';
    }

    switch (match[1].trim().toLowerCase()) {
        case 'x':
            return 'done';

        case '-':
            return 'abandoned';

        default:
            return 'open';
    }
}

function extractProjects(text: string): string[] {
    const matches = text.match(projectRegex);

    if (!matches) {
        return [];
    }

    return [...matches];
}

function extractTags(text: string): string[] {
    const matches = text.match(tagRegex);

    if (!matches) {
        return [];
    }

    return [...matches];
}

function extractStartsAt(text: string): Date | null {
    const matches = text.match(startRegexGlobal);

    if (!matches) {
        return null;
    }

    const [, value] = matches[0].split(':');

    if (!value) {
        return null;
    }

    return parseDateDescription(value);
}

function extractDeadline(text: string): Date | null {
    const matches = text.match(deadlineRegexGlobal);

    if (!matches) {
        return null;
    }

    const [, value] = matches[0].split(':');

    if (!value) {
        return null;
    }

    return parseDateDescription(value);
}

export function createTodoFromText(text: string): Todo {
    const status = determineStatus(text);
    const projects = extractProjects(text);
    const tags = extractTags(text);
    const startsAt = extractStartsAt(text);
    const deadline = extractDeadline(text);

    return new Todo(text, status, projects, tags, startsAt, deadline);
}
