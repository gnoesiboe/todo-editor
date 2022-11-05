import { FC, ReactNode } from 'react';

const Label: FC<{ children: ReactNode }> = ({ children }) => (
    <label className="flex gap-2 items-center">{children}</label>
);

const List: FC<{ children: ReactNode }> = ({ children }) => <ul>{children}</ul>;

const ListItem: FC<{ children: ReactNode }> = ({ children }) => (
    <li>{children}</li>
);

const Heading: FC<{ children: string }> = ({ children }) => (
    <h2 className="font-extrabold underline uppercase">{children}</h2>
);

const Count: FC<{ children: number }> = ({ children }) => (
    <span className="opacity-40 text-xs">({children})</span>
);

const Filter = {
    Heading,
    List,
    ListItem,
    Label,
    Count,
};

export default Filter;
