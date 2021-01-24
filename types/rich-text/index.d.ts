declare module "rich-text" {
    import Delta, {Op} from 'quill-delta';

    const name: string;
    const uri: string;

    function create(initial?: Op[] | { ops: Op[] }): Delta;
    function compose(delta1: Op[] | { ops: Op[] }, delta2: Op[] | { ops: Op[] }): Delta;
    function diff(delta1: Op[] | { ops: Op[] }, delta2: Op[] | { ops: Op[] }): Delta;

    function transform(
        delta1: Op[] | { ops: Op[] },
        delta2: Op[] | { ops: Op[] },
        side: string
    ): Delta|number;

    function transformCursor(
        cursor: number,
        delta: Delta,
        isOwnOp: boolean
    ): number;

    function normalize(delta: Delta): Delta;
    function serialize(delta: Delta): Op[];
    function deserialize(ops: Op[]): Delta;

    interface IRange {
        index: number;
        length: number
    }

    function transformPresence(
        range: IRange,
        op: Op,
        isOwnOp: boolean
    ): IRange

    const type = {
        name,
        uri,
        create,
        apply,
        compose,
        diff,
        transform,
        transformCursor,
        normalize,
        serialize,
        deserialize,
        transformPresence
    }

    module.exports = {
        Delta,
        type
    }

    export = type

}
