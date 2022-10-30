export type TodoStatus = 'done' | 'open';

export default class Todo {
    constructor(
        public readonly status: TodoStatus,
        public readonly projects: string[],
        public readonly tags: string[],
    ) {}

    isDone(): boolean {
        return this.status === 'done';
    }
}
