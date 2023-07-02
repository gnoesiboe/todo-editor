import { Children, FC, ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const VersionList: FC<Props> = ({ children }) => (
    <ul>
        {Children.map(children, (child) => (
            <li
                key={child.key}
                className="border-black border-opacity-10 border-t last:border-b py-1"
            >
                {child}
            </li>
        ))}
    </ul>
);

export default VersionList;
