"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var quill_delta_1 = __importDefault(require("quill-delta"));
var richText = {
    Delta: quill_delta_1.default,
    type: {
        name: 'rich-text',
        uri: 'https://sharejs.org/types/rich-text/v1',
        create: function (initial) {
            return new quill_delta_1.default(initial);
        },
        apply: function (snapshot, delta) {
            snapshot = new quill_delta_1.default(snapshot);
            delta = new quill_delta_1.default(delta);
            return snapshot.compose(delta);
        },
        compose: function (delta1, delta2) {
            delta1 = new quill_delta_1.default(delta1);
            delta2 = new quill_delta_1.default(delta2);
            return delta1.compose(delta2);
        },
        diff: function (delta1, delta2) {
            delta1 = new quill_delta_1.default(delta1);
            delta2 = new quill_delta_1.default(delta2);
            return delta1.diff(delta2);
        },
        transform: function (delta1, delta2, side) {
            delta1 = new quill_delta_1.default(delta1);
            delta2 = new quill_delta_1.default(delta2);
            // Fuzzer specs is in opposite order of delta interface
            return delta2.transform(delta1, side === 'left');
        },
        transformCursor: function (cursor, delta, isOwnOp) {
            return delta.transformPosition(cursor, !isOwnOp);
        },
        normalize: function (delta) {
            return delta; // quill-delta is already canonical
        },
        serialize: function (delta) {
            return delta.ops;
        },
        deserialize: function (ops) {
            return new quill_delta_1.default(ops);
        }
    }
};
module.exports = richText;
//# sourceMappingURL=type.js.map