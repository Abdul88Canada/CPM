import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

import { User } from '../models/users';


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email, userName, password } = req.body;

            const existingEmail = await User.findOne({ email });
            const existingUserName = await User.findOne({ userName });

            if (existingEmail) {
                throw new BadRequestError('Email in use');
            }

            if (existingUserName) {
                throw new BadRequestError('username in use');
            }


            const user_type = 'Owner';
            const full_name = '';
            const created_at = new Date();

            const user = User.build({email, userName, password, user_type, created_at});
            await user.save();

            // generate JWT
            const userJwt = jwt.sign({
                id: user.id,
                email: user.email,
                userName: user.userName,
                user_type: user_type
            }, 'aliali');

            // store it on session object
            req.session = {
                jwt: userJwt
            };
            console.log('IN AUTH WITH JST: ', req.session.jwt);
            res.status(201).send(user);
            } catch (error) {
                let msg = (error as Error).message;
                console.log(msg);
            }
    
});

export { router as signupRouter };