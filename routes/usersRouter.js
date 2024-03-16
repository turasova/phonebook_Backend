import express from 'express';
import { signup, login } from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import { loginUserSchema, signupUserSchema } from '../schemas/userSchemas.js';
import { authenticate } from '../middlewares/auth.js';
const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(signupUserSchema), signup);
usersRouter.post('/login', validateBody(loginUserSchema), login);
usersRouter.post('/logout', authenticate);
usersRouter.get('/current', authenticate);

export default usersRouter;
