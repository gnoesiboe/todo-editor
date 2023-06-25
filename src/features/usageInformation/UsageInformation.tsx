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
                <div className="space-y-12">
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
                                        <code>
                                            [label](https://www.google.nl)
                                        </code>
                                    </td>
                                    <td>Adds a Markdown link</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code># Heading</code>
                                    </td>
                                    <td>
                                        Adds a Markdown heading. Use{' '}
                                        <code>##</code> for second level heading
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>
                                            - [ ] Do some grocery shopping
                                        </code>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                Start a line with{' '}
                                                <code>- [ ]</code> for a new
                                                Markdown todo.{' '}
                                            </li>
                                            <li>
                                                Apply spaces before the{' '}
                                                <code>-</code> to apply nesting.{' '}
                                            </li>
                                            <li>
                                                To close the todo fill up, with
                                                `x`, like: <code>- [x]</code>
                                            </li>
                                            <li>
                                                To abandon todo fill up, with
                                                `-`, like: <code>- [-]</code>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>#project</code>
                                    </td>
                                    <td>
                                        Adds a todo to a project, and allows it
                                        to be filtered using the project filter
                                        on the right. Replace the `project` part
                                        with any value you lke, like{' '}
                                        <code>#homework</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>@tag</code>
                                    </td>
                                    <td>
                                        Adds a tag to a todo, and allows it to
                                        be filtered using the tag filter on the
                                        right. Replace the 'tag' part with any
                                        value you like, like:{' '}
                                        <code>@waiting</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>st:[date]</code>
                                    </td>
                                    <td>
                                        Example: <code>st:2022-04-12</code>.
                                        Sets the date when the todo is ready to
                                        be started. Besides the 'yyyy-m-d'
                                        format, you can also use relative date
                                        descriptions:
                                        <ul className="list-disc pl-6 my-2">
                                            <li>
                                                <code>today</code>
                                            </li>
                                            <li>
                                                <code>tomorrow</code>
                                            </li>
                                            <li>
                                                <code>monday</code>
                                            </li>
                                            <li>
                                                <code>tuesday</code>
                                            </li>
                                            <li>
                                                <code>wednesday</code>
                                            </li>
                                            <li>
                                                <code>thursday</code>
                                            </li>
                                            <li>
                                                <code>friday</code>
                                            </li>
                                            <li>
                                                <code>saturday</code>
                                            </li>
                                            <li>
                                                <code>sunday</code>
                                            </li>
                                        </ul>
                                        On save the relative date is replaced
                                        with a fixed date.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>dl:[date]</code>
                                    </td>
                                    <td>
                                        Example: <code>dl:2022-04-12</code>.
                                        Sets the date when the todo is due: the
                                        deadline. Besides the 'yyyy-m-d' format,
                                        you can also use relative date
                                        descriptions. See `st:date` for possible
                                        options. On save the relative date is
                                        replaced with a fixed date.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>&#60;some note&#62;</code>
                                    </td>
                                    <td>
                                        Adds a note to a todo. The note is not
                                        collapsed by default, but visible on
                                        hover over a text icon.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>---</code> or <code>...</code>
                                    </td>
                                    <td>Insert Markdown line separator</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>`code`</code>
                                    </td>
                                    <td>Insert code block</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="space-y-4">
                            <h2>Keyboard shortcuts</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Shortcut</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>ctrl + s</code>
                                        </td>
                                        <td>
                                            Force save. (Everything is
                                            auto-saved too)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>tab</code>
                                        </td>
                                        <td>Indent current line</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>shift + tab</code>
                                        </td>
                                        <td>'un-indent' current line</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>alt + ↑</code>
                                        </td>
                                        <td>Move the current line up</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>alt + ↓</code>
                                        </td>
                                        <td>Move the current line down</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsageInformation;
