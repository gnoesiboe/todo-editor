import Todo, { TodoStatus } from './Todo';

function determineStatus(text: string): TodoStatus {
    const isDone = /^\[x] .+/.test(text);

    return isDone ? 'done' : 'open';
}

function extractProjects(text: string): string[] {
    const matches = text.match(/#([^ ]+)/g);

    if (!matches) {
        return [];
    }

    return [...matches];
}

function extractTags(text: string): string[] {
    const matches = text.match(/@([^ ]+)/g);

    if (!matches) {
        return [];
    }

    return [...matches];
}

export function createTodoFromText(text: string): Todo {
    const status = determineStatus(text);
    const projects = extractProjects(text);
    const tags = extractTags(text);

    return new Todo(status, projects, tags);
}
