export type TodoStatus = 'done' | 'open' | 'abandoned';

export default class Todo {
    constructor(
        public readonly rawText: string,
        public readonly status: TodoStatus,
        public readonly projects: string[],
        public readonly tags: string[],
        public readonly startsAt: Date | null,
        public readonly deadline: Date | null,
    ) {}

    isDone(): boolean {
        return this.status === 'done';
    }

    isAbandoned(): boolean {
        return this.status === 'abandoned';
    }
}
