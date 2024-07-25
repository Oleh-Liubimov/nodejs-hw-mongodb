import { ONE_DAY } from '../constants/index.js';
import { loginUser } from '../services/auth.js';
import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    msg: 'Succsesfully registered a user.',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.cookies('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  }),
    res.cookies('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

  res.json({
    status: 200,
    msg: 'Succsesfully logged in an user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
