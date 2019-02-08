import * as token from './Token';

let cookie = 'token=thetoken';

Object.defineProperty(document, 'cookie', {
    get: jest.fn().mockImplementation(() => { return cookie; }),
  });

test('Gets a previously saved token from a cookie', () => {
    expect(token.getSessionTokenFromCookie()).toBe('thetoken');
})

test('Returns null if token has not been set', () => {
    cookie = null;
    expect(token.getSessionTokenFromCookie()).toBe(null);
})

