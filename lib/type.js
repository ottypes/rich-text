var Delta = require('quill-delta');

// Slightly modified from the base rich-text implementation
function transformCursor(cursor, delta, isOwnOp) {
  // Rewrap in Quill Delta since we seem to get a raw ops object
  delta = new Delta(delta);
  return delta.transformPosition(cursor, !isOwnOp);
}

// Copied from https://github.com/Teamwork/ot-rich-text/blob/master/src/Operation.js
function createPresence(presence) {
  return isValidPresence(presence)
    ? presence
    : {
        u: '',
        c: 0,
        s: []
      };
}

// Copied from https://github.com/Teamwork/ot-rich-text/blob/master/src/Operation.js
function transformPresence(presence, operation, isOwnOperation) {
  var user = presence.u;
  var change = presence.c;
  var selections = presence.s;
  var newSelections = new Array(selections.length);

  for (var i = 0, l = selections.length; i < l; ++i) {
    var selection = selections[i];
    var newStart = transformCursor(selection[0], operation[0].o, isOwnOperation);
    var newEnd =
      selection[0] === selection[1]
        ? newStart
        : transformCursor(selection[1], operation[0].o, isOwnOperation);
    newSelections[i] = [newStart, newEnd];
  }

  return {
    u: user,
    c: change,
    s: newSelections
  };
}

// Copied from https://github.com/Teamwork/ot-rich-text/blob/master/src/Operation.js
function comparePresence(presence1, presence2) {
  if (presence1 === presence2) {
    return true;
  }

  if (
    presence1 == null ||
    presence2 == null ||
    presence1.u !== presence2.u ||
    presence1.c !== presence2.c ||
    presence1.s.length !== presence2.s.length
  ) {
    return false;
  }

  for (var i = 0, l = presence1.s.length; i < l; ++i) {
    if (
      presence1.s[i][0] !== presence2.s[i][0] ||
      presence1.s[i][1] !== presence2.s[i][1]
    ) {
      return false;
    }
  }

  return true;
}

// Copied from https://github.com/Teamwork/ot-rich-text/blob/master/src/Operation.js
function isValidPresence(presence) {
  if (
    presence == null ||
    typeof presence.u !== 'string' ||
    typeof presence.c !== 'number' ||
    !isFinite(presence.c) ||
    Math.floor(presence.c) !== presence.c ||
    !Array.isArray(presence.s)
  ) {
    return false;
  }

  var selections = presence.s;

  for (var i = 0, l = selections.length; i < l; ++i) {
    var selection = selections[i];

    if (
      !Array.isArray(selection) ||
      selection.length !== 2 ||
      selection[0] !== (selection[0] | 0) ||
      selection[1] !== (selection[1] | 0)
    ) {
      return false;
    }
  }

  return true;
}

module.exports = {
  Delta: Delta,
  type: {
    name: 'rich-text',
    uri: 'http://sharejs.org/types/rich-text/v1',

    create: function(initial) {
      return new Delta(initial);
    },

    apply: function(snapshot, delta) {
      snapshot = new Delta(snapshot);
      delta = new Delta(delta);
      return snapshot.compose(delta);
    },

    compose: function(delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.compose(delta2);
    },

    diff: function(delta1, delta2) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      return delta1.diff(delta2);
    },

    transform: function(delta1, delta2, side) {
      delta1 = new Delta(delta1);
      delta2 = new Delta(delta2);
      // Fuzzer specs is in opposite order of delta interface
      return delta2.transform(delta1, side === 'left');
    },

    transformCursor: transformCursor,

    normalize: function(delta) {
      return delta; // quill-delta is already canonical
    },

    serialize: function(delta) {
      return delta.ops;
    },

    deserialize: function(ops) {
      return new Delta(ops);
    },

    createPresence: createPresence,
    transformPresence: transformPresence,
    comparePresence: comparePresence,
    isValidPresence: isValidPresence
  }
};
