export function extractUniqueValues<ItemType>(items: ItemType[]): ItemType[] {
    return items.filter(function (project, position, self) {
        return self.indexOf(project) === position;
    });
}

export function swapArrayIndexes<T>(
    items: T[],
    index1: number,
    index2: number,
): T[] {
    const newArray: T[] = [...items];

    newArray[index1] = newArray.splice(index2, 1, newArray[index1])[0];

    return newArray;
}
