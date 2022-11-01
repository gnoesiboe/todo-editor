export function extractUniqueValues<ItemType>(items: ItemType[]): ItemType[] {
    return items.filter(function (project, position, self) {
        return self.indexOf(project) === position;
    });
}
