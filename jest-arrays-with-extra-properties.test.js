// These arrays are passed through Object.assign to keep their creation all on
// one line, but `array.foo = 'bar'` would work just as well, of course.

const arrayWithFooBar = Object.assign([1, 2, 3], { foo: 'bar' });
const arrayWithFooSomethingElse = Object.assign([1, 2, 3], { foo: 'something else' });
const plainArray = [1, 2, 3];

describe('extra properties on arrays', () => {
  it('should be reported when they only exist on actual', () => {
    // expected: toEqual throws with a message that calls out "foo" as being
    // present on actual, but not expected

    // actual: toEqual throws, but the message simply says "serializes to the
    // same string"

    expect(() => expect(arrayWithFooBar).toEqual(plainArray)).toThrowError(/\bfoo\b/);
  });

  it('should be reported when they only exist on expected', () => {
    // expected: toEqual throws with a message that calls out "foo" as being
    // present on expected, but not actual

    // actual: toEqual throws, but the message simply says "serializes to the
    // same string"

    expect(() => expect(plainArray).toEqual(arrayWithFooBar)).toThrowError(/\bfoo\b/);
  });

  it('should be reported when they differ', () => {
    // expected: toEqual throws with a message that calls out "foo" as having a
    // different value in actual and expected

    // actual: toEqual throws, but the message simply says "serializes to the
    // same string"

    expect(() => expect(arrayWithFooSomethingElse).toEqual(arrayWithFooBar)).toThrowError(/\bfoo\b/);
  });

  it('should be recorded in snapshots', () => {
    // expected: toMatchInlineSnapshot throws with a message that calls out
    // "foo" as being present on actual, but not snapshot

    // actual: toMatchInlineSnapshot doesn't throw at all; it determines actual
    // and snapshot to be equal, because the "foo" property isn't serialized
    // from actual

    expect(() =>
      expect(arrayWithFooBar).toMatchInlineSnapshot(`
[
  1,
  2,
  3,
]
`),
    ).toThrowError(/\bfoo\b/);
  });
});
