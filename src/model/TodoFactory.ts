import Todo, { TodoStatus } from './Todo';

export const todoRegex = /^\[[ x-]{1,1}] *.*$/g;
export const projectRegex = /#([^ ]+)/g;
export const tagRegex = /@([^ ]+)/g;

function determineStatus(text: string): TodoStatus {
    const isDone = /^\[x] .+/.test(text);

    if (isDone) {
        return 'done';
    }

    const isAbondoned = /^\[-] .+/.test(text);

    if (isAbondoned) {
        return 'abandoned';
    }

    return 'open';
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
