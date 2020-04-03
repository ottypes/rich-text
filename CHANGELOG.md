## v4.1.0

#### Features

- Add `transformPresence()` method

## v4.0.0

#### Breaking Changes

These were never documented as officially supported but to be safe we are doing a major version bump.

- No longer works in IE8 as there is function called delete and IE8 treats that as a reserved identifier
- The source structure has changed so those utilizing NPM's ability to import from arbitrary directories ex. import
  DeltaOp from 'quill-delta/lib/op' will have to update their imports

## v3.0.0

#### Breaking Changes

- Deep copy and compare attributes and deltas

#### Features

## v2.1.0

#### Features

- Add `concat()` method for document Deltas

## v2.0.0

#### Breaking Changes

- `compose()` returns a new Delta instead of self-modifying

#### Features

- Support embed being any non-string type
