import { FC, useState } from 'react';
import { ChevronUp } from 'react-feather';
import composeClassName from 'classnames';

const UsageInformation: FC = () => {
    const [unfolded, setUnfolded] = useState<boolean>(false);

    const toggleUnfolded = () => setUnfolded((current) => !current);

    const className = composeClassName('transition-all', {
        'space-y-8 p-8 bg-amber-100': unfolded,
    });

    return (
        <div className={className}>
            <button
                type="button"
                className="flex gap-2 items-center"
                onClick={() => toggleUnfolded()}
            >
                <h1 className="text-lg">Usage information</h1>
                <ChevronUp
                    className={composeClassName(
                        'transition-transform',
                        unfolded ? 'rotate-180' : '',
                    )}
                />
            </button>

            {unfolded && (
                <div className="space-y-4">
                    <h2>Code syntax</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Syntax</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <code>[label](https://www.google.nl)</code>
                                </td>
                                <td>Adds a Markdown link</td>
                            </tr>
                            <tr>
                                <td>
                                    <code># Heading</code>
                                </td>
                                <td>
                                    Adds a Markdown heading. Use `##` for deeper
                                    level heading
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>- [ ] Do some grocery shopping</code>
                                </td>
                                <td>
                                    <ul>
                                        <li>
                                            Start a line with <code>- [ ]</code>{' '}
                                            for a new Markdown todo.{' '}
                                        </li>
                                        <li>
                                            Apply spaces before the{' '}
                                            <code>-</code> to apply nesting.{' '}
                                        </li>
                                        <li>
                                            To close the todo fill up, with `x`,
                                            like: <code>- [x]</code>
                                        </li>
                                        <li>
                                            To abandon todo fill up, with `-`,
                                            like: <code>- [-]</code>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>#project</code>
                                </td>
                                <td>
                                    Adds a todo to a project, and allows it to
                                    be filtered using the project filter on the
                                    right. Replace the `project` part with any
                                    value you lke, like <code>#homework</code>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>@tag</code>
                                </td>
                                <td>
                                    Adds a tag to a todo, and allows it to be
                                    filtered using the tag filter on the right.
                                    Replace the 'tag' part with any value you
                                    like, like: <code>@waiting</code>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>---</code> or <code>...</code>
                                </td>
                                <td>Insert Markdown line separator</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsageInformation;
