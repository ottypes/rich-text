const { expect } = require("chai");

const { type, Delta } = require("../lib/type");

describe("cursors", function () {
  it("transforms cursor on deltas", function () {
    const op = new Delta().retain(1).insert("hi");
    expect(type.transformCursor(2, op)).to.eql(4);
  });

  it("transforms cursor on objects", function () {
    const op = [{ retain: 1 }, { insert: "hi" }];
    expect(type.transformCursor(2, op)).to.eql(4);
  });
});
