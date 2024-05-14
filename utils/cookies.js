

export function getUserToken(req) {
  const cookie = req.headers.cookie;
  let userToken = cookie ? parseCookie(cookie)['userToken'] : null;

  if (!userToken) {
    userToken = uuidv4();
    
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


