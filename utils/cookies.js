
import { parseCookies, setCookie } from 'next-cookies';

export function getUserToken(ctx) {
  const cookies = parseCookies(ctx);
  let userToken = cookies.userToken;
  if (!userToken) {
    userToken = uuidv4(); // Generate a new UUID
    setCookie(ctx, 'userToken', userToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }
  return userToken;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
