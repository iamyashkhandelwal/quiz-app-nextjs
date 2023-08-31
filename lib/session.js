export const getCookie = (key = "", req = null) => {
  let cookieState;
  let valueToReturn = null;
  if (req?.headers?.cookie) cookieState = req.headers?.cookie;
  if (process.browser && document) cookieState = document.cookie;
  if (cookieState) {
      const rawCookie = cookieState.split(";").find((c) => c.trim().startsWith(`${key}=`));
      if (rawCookie) valueToReturn = rawCookie.split("=")[1];
  }
  return valueToReturn;
}

export const setCookie = (key, value) => {
  if (process.browser && document) {
      const now = new Date();
      const expireTime = now.getTime() + 24*60*60*1000; // 24 hours
      now.setTime(expireTime);
      document.cookie = `${key}=${value}; SameSite=strict; Secure; expires=${now.toUTCString()}; path=/;`;
    } else {
      console.log("setCookie failed");
    }
}