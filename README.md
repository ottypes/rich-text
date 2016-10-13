# Rich Text OT Type [![Build Status](https://travis-ci.org/ottypes/rich-text.svg?branch=master)](https://travis-ci.org/ottypes/rich-text)

An OT Type for rich text documents.

For documentation on the spec this type implements, see [ottypes/docs](https://github.com/ottypes/docs). Rich Text does not implement the optional `invert`, but does implement `normalize`, tranformCursor, `serialize`, and `deserialize`. Please refer to [ottypes/docs](https://github.com/ottypes/docs) for documentation.

Rich Text uses [quill-delta](https://github.com/quilljs/delta) on the back end.


## Operations

Operations are an Array of changes, each operation describing a singular change to a document. They can be an [`insert`](#insert-operation), [`delete`](#delete-operation) or [`retain`](#retain-operation). Note operations do not take an index. They always describe the change at the current index. Use retains to "keep" or "skip" certain parts of the document.


### Insert Operation

Insert operations have an `insert` key defined. A String value represents inserting text. Any other type represents inserting an embed (however only one level of object comparison will be performed for equality).

In both cases of text and embeds, an optional `attributes` key can be defined with an Object to describe additonal formatting information. Formats can be changed by the [retain](#retain) operation.

```js
// Insert a bolded "Text"
{ insert: "Text", attributes: { bold: true } }

// Insert a link
{ insert: "Google", attributes: { href: 'https://www.google.com' } }

// Insert an embed
{
  insert: { image: 'https://octodex.github.com/images/labtocat.png' },
  attributes: { alt: "Lab Octocat" }
}

// Insert another embed
{
  insert: { video: 'https://www.youtube.com/watch?v=dMH0bHeiRNg' },
  attributes: {
    width: 420,
    height: 315
  }
}
```

### Delete Operation

Delete operations have a Number `delete` key defined representing the number of characters to delete. All embeds have a length of 1.

```js
// Delete the next 10 characters
{ delete: 10 }
```

### Retain Operation

Retain operations have a Number `retain` key defined representing the number of characters to keep (other libraries might use the name keep or skip). An optional `attributes` key can be defined with an Object to describe formatting changes to the character range. A value of `null` in the `attributes` Object represents removal of that key.

*Note: It is not necessary to retain the last characters of a document as this is implied.*

```js
// Keep the next 5 characters
{ retain: 5 }

// Keep and bold the next 5 characters
{ retain: 5, attributes: { bold: true } }

// Keep and unbold the next 5 characters
// More specifically, remove the bold key in the attributes Object
// in the next 5 characters
{ retain: 5, attributes: { bold: null } }
```


## Commentary

This library was originally implemented as part of a full fledged Google Docs like product called Stypi. Eventually, parts were open sourced--the editor became [Quill](https://github.com/quilljs/quill), the realtime engine became [tandem](https://github.com/tandem/tandem) and the document type became [tandem-core](https://github.com/tandem/tandem-core).

[ShareJS](https://github.com/josephg/ShareJS) was a more established open source realtime collaboration engine, so `tandem` and `tandem-core` were deprecated to unify support under one project. `tandem-core` was rewritten as `rich-text`, to adhere to ShareJS's [OT Type specification](https://github.com/ottypes/docs).

The needs of a realtime rich text document type was formerly a superset of a generalized rich text document type. As Quill has evolved, the reverse is becoming true. This `rich-text` library today provides the interface to use with ShareJS, but the underlying type and fuctionality is implemented in [`quill-delta`](https://github.com/quilljs/delta).
