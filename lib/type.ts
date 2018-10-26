import Delta from 'quill-delta'
import Op from 'quill-delta/src/Op'

const richText = {
  Delta: Delta,
  type: {
    name: 'rich-text',
    uri: 'https://sharejs.org/types/rich-text/v1',
    
    create (initial:Delta):Delta {
      return new Delta(initial)
    },

    apply (snapshot:Delta, delta:Delta):Delta {
      snapshot = new Delta(snapshot)
      delta = new Delta(delta)
      return snapshot.compose(delta)
    },

    compose (delta1:Delta, delta2:Delta):Delta {
      delta1 = new Delta(delta1)
      delta2 = new Delta(delta2)
      return delta1.compose(delta2)
    },

    diff (delta1:Delta, delta2:Delta):Delta {
      delta1 = new Delta(delta1)
      delta2 = new Delta(delta2)
      return delta1.diff(delta2)
    },

    transform (delta1:Delta, delta2:Delta, side:string):Delta {
      delta1 = new Delta(delta1)
      delta2 = new Delta(delta2)
      // Fuzzer specs is in opposite order of delta interface
      return delta2.transform(delta1, side === 'left')
    },

    transformCursor (cursor:number, delta:Delta, isOwnOp:boolean):number {
      return delta.transformPosition(cursor, !isOwnOp)
    },

    normalize (delta:Delta):Delta {
      return delta;   // quill-delta is already canonical
    },

    serialize (delta:Delta):Op[] {
      return delta.ops
    },

    deserialize (ops:Op[]):Delta {
      return new Delta(ops)
    }
  }
}

export = richText