const COOKIE_NAME = 'instabread';
const COOKIE_PASSWORD = 'AYPd0WTUuXAhD0f4M8fgdDEXooQQKdiw';

export const ironOptions = {
  cookieName: COOKIE_NAME,
  password: COOKIE_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};