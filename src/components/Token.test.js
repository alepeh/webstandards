import * as token from './Token';

let cookie = 'token=thetoken';

Object.defineProperty(document, 'cookie', {
    get: jest.fn().mockImplementation(() => { return cookie; }),
  });

test('Gets a previously saved token from a cookie', () => {
    expect(token.getSessionTokenFromCookie()).toBe('thetoken');
})

test('Returns null if token has not been set', () => {
    cookie = "";
    expect(token.getSessionTokenFromCookie()).toBe(null);
})

test('if cookie is not set, token is treated as expired', () => {
    cookie = "";
    expect(token.isSessionTokenExpired()).toBe(true);
})

test('validates non-expired token correctly', () => {
    let d = new Date();
    d.setTime(d.getTime() + (10000));
    cookie = "token=thetoken;expires=" + d.getTime();
    expect(token.isSessionTokenExpired()).toBe(false);
})

test('validates expired token correctly', () => {
    let d = new Date();
    d.setTime(d.getTime() - (1000));
    cookie = "token=thetoken;expires=" + d.getTime();
    expect(token.isSessionTokenExpired()).toBe(true);
})