import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import { loginUserSchema, registerUserSchema } from '../validation/auth';
import { loginUserController, registerUserController } from '../controllers/auth';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default router;
