
/*import { parseCookies, setCookie } from 'next-cookies';

// Updated getUserToken to accept only req directly
export function getUserToken(req) {
  const cookies = parseCookies({ req });  // Ensuring it's an object with req property
  let userToken = cookies.userToken;
  if (!userToken) {
    userToken = uuidv4(); // Generate a new UUID
    setCookie({ req }, 'userToken', userToken, { // Pass an object with req to setCookie
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

*/

export function getUserToken(req) {
  const cookie = req.headers.cookie;
  let userToken = cookie ? parseCookie(cookie)['userToken'] : null;

  if (!userToken) {
    userToken = uuidv4();
    // Normally you'd set cookies on the client or send a Set-Cookie header in a response
    // Response example: res.setHeader('Set-Cookie', `userToken=${userToken}; Max-Age=${30 * 24 * 60 * 60}; Path=/;`);
  }

  return userToken;
}

function parseCookie(cookie) {
  return cookie.split(';').reduce((res, item) => {
    const data = item.trim().split('=');
    res[data[0]] = data[1];
    return res;
  }, {});
}


