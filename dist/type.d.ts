import Delta from 'quill-delta';
import Op from 'quill-delta/src/Op';
declare const richText: {
    Delta: typeof Delta;
    type: {
        name: string;
        uri: string;
        create(initial: Delta): Delta;
        apply(snapshot: Delta, delta: Delta): Delta;
        compose(delta1: Delta, delta2: Delta): Delta;
        diff(delta1: Delta, delta2: Delta): Delta;
        transform(delta1: Delta, delta2: Delta, side: string): Delta;
        transformCursor(cursor: number, delta: Delta, isOwnOp: boolean): number;
        normalize(delta: Delta): Delta;
        serialize(delta: Delta): Op[];
        deserialize(ops: Op[]): Delta;
    };
};
export = richText;
