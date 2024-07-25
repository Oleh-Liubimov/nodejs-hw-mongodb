import { randomBytes } from 'crypto';

import { ONE_DAY, FIFTEEN_MINUTES } from '../constants/index.js';

export const createSession = () => {
  const refreshToken = randomBytes(30).toString('base64');
  const accessToken = randomBytes(30).toString('base64');

  return {
    refreshToken,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
