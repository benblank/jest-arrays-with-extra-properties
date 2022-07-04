const arrayWithFooBar = Object.assign([1, 2, 3], { foo: 'bar' });
const arrayWithFooSomethingElse = Object.assign([1, 2, 3], { foo: 'something else' });
const plainArray = [1, 2, 3];

describe('extra properties on arrays', () => {
  it('should be reported when they only exist on actual', () => {
    expect(() => expect(arrayWithFooBar).toEqual(plainArray)).toThrowError(/\bfoo\b/);
  });

  it('should be reported when they only exist on expected', () => {
    expect(() => expect(plainArray).toEqual(arrayWithFooBar)).toThrowError(/\bfoo\b/);
  });

  it('should be reported when they differ', () => {
    expect(() => expect(arrayWithFooSomethingElse).toEqual(arrayWithFooBar)).toThrowError(/\bfoo\b/);
  });

  it('should be recorded in snapshots', () => {
    expect(() =>
      expect(arrayWithFooBar).toMatchInlineSnapshot(`
Array [
  1,
  2,
  3,
]
`),
    ).toThrowError(/\bfoo\b/);
  });
});
