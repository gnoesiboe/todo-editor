import { FC, ReactNode } from 'react';

const Label: FC<{ children: ReactNode }> = ({ children }) => (
    <label className="flex gap-2">{children}</label>
);

const List: FC<{ children: ReactNode }> = ({ children }) => <ul>{children}</ul>;

const ListItem: FC<{ children: ReactNode }> = ({ children }) => (
    <li>{children}</li>
);

const Heading: FC<{ children: string }> = ({ children }) => (
    <h2 className="font-extrabold underline uppercase">{children}</h2>
);

const Filter = {
    Heading,
    List,
    ListItem,
    Label,
};

export default Filter;
