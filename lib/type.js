var Delta = require('quill-delta');


module.exports = {
  Delta: Delta,
  type: {
    name: 'rich-text',
    uri: 'http://sharejs.org/types/rich-text/v1',

    create: function (initial) {
      return new Delta(initial);
    },

    apply: function (snapshot, delta) {
      snapshot = new Delta(snapshot);
      delta = new Delta(delta);
      return snapshot.compose(delta);
    },

    compose: function (delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.compose(delta2);
    },

    diff: function (delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.diff(delta2);
    },

    transform: function (delta1, delta2, side) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      // Fuzzer specs is in opposite order of delta interface
      return delta2.transform(delta1, side === 'left');
    },

    transformCursor: function(cursor, delta, isOwnOp) {
      return delta.transformPosition(cursor, !isOwnOp);
    },

    normalize: function(delta) {
      return delta;   // quill-delta is already canonical
    },

    serialize: function(delta) {
      return delta.ops;
    },

    deserialize: function(ops) {
      return new Delta(ops);
    },

    transformPresence: function(range, op, isOwnOp) {
      if (!range) {
        return null;
      }

      const delta = new Delta(op);
      const start = this.transformCursor(range.index, delta, isOwnOp);
      const end = this.transformCursor(range.index + range.length, delta, isOwnOp);

      return Object.assign({}, range, {
        index: start,
        length: end - start,
      });
    },
  }
};
