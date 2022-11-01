import Todo, { TodoStatus } from './Todo';

export const todoRegex = /^[ ]{0,}\[([ x-]{1,1})] *.*$/i;
export const projectRegex = /#([^ ]+)/g;
export const tagRegex = /@([^ ]+)/g;

function determineStatus(text: string): TodoStatus {
    const match = text.match(todoRegex);

    console.log('text', match);

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

export function createTodoFromText(text: string): Todo {
    const status = determineStatus(text);
    const projects = extractProjects(text);
    const tags = extractTags(text);

    return new Todo(text, status, projects, tags);
}
