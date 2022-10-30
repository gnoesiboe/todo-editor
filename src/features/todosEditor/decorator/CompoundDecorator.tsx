import { CompositeDecorator, ContentBlock, DraftDecorator } from 'draft-js';
import { List } from 'immutable';
import { JSXElementConstructor, ReactNode } from 'react';

const Span = ({ children }: { children: ReactNode }) => <span>{children}</span>;

export default class CompoundDecorator {
    private readonly decorators: Array<DraftDecorator | CompositeDecorator>;

    constructor(decorators: DraftDecorator[] = []) {
        this.decorators = decorators.map((decorator) => {
            return decorator.component
                ? new CompositeDecorator([decorator])
                : decorator;
        });
    }

    getDecorations(block: ContentBlock): List<any> {
        const emptyTuples = Array(block.getText().length).fill(
            Array(this.decorators.length).fill(null),
        );

        const decorations = this.decorators.reduce(
            (tuples, decorator, index) => {
                // @ts-ignore @todo fix
                const blockDecorations = decorator.getDecorations(block);

                return tuples.map((tuple, tupleIndex) => {
                    return [
                        ...tuple.slice(0, index),
                        blockDecorations.get(tupleIndex),
                        ...tuple.slice(index + 1),
                    ];
                });
            },
            emptyTuples,
        );

        // @ts-ignore @todo fix
        return List(decorations.map(JSON.stringify));
    }

    getComponentForKey(key: string) {
        const tuple = JSON.parse(key);

        return (props: Record<string, any>) => {
            const { decoratorProps, ...compositionProps } = props;

            const Composed: JSXElementConstructor<any> = tuple.reduce(
                // @ts-ignore @todo fix
                (Composition, decoration, index) => {
                    if (decoration !== null) {
                        const decorator = this.decorators[index];
                        const Component =
                            // @ts-ignore @todo fix
                            decorator.getComponentForKey(decoration);
                        const componentProps = {
                            ...compositionProps,
                            ...decoratorProps[index],
                        };

                        return () => (
                            <Component {...componentProps}>
                                <Composition {...compositionProps} />
                            </Component>
                        );
                    }
                    return Composition;
                },
                Span,
            );

            return <Composed>{props.children}</Composed>;
        };
    }

    getPropsForKey(key: string): Record<string, any> {
        const tuple = JSON.parse(key);

        return {
            // @ts-ignore @todo fix
            decoratorProps: tuple.map((decoration, index) => {
                const decorator = this.decorators[index];
                return decoration !== null
                    ? // @ts-ignore @todo fix
                      decorator.getPropsForKey(decoration)
                    : {};
            }),
        };
    }
}
