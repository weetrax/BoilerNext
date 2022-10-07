import { connectToDatabase } from './../../../lib/database/index';
import { createRouter } from 'next-connect';
import { IUser, User } from '../../../lib/database/models/User';
import { lang } from '../../../constants/lang';
import { ResponseError } from '../../../types';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  //.use(expressWrapper(cors())) // express middleware are supported if you wrap it with expressWrapper
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .post(async (req, res) => {
    connectToDatabase();

    const { username, email, password, passwordConfirm, country, city } =
      req.body;

    let error: ResponseError = {
      message: ""
    }

    if (password !== passwordConfirm) {
      error = { ...error, message: lang.passwordNotMatch.fr }
      return res.status(500).json(error);
    }

    const user: IUser = {
      username,
      email,
      password,
      country,
      city,
      isVerified: true,
      createdAt: new Date()
    };


    /* Check if the username is already taken */
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      error = { ...error, message: lang.usernameAlreadyTaken.fr }
      return res.status(500).json(error);
    }


    /* Checking if the email is already taken. */
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      error = { ...error, message: lang.emailAlreadyTaken.fr }
      return res.status(500).json(error);
    }

    try {
      const newUser = new User(user);
      const saved = await newUser.save();
      return res.status(200).json(saved);
    } catch (err) {
      error = { ...error, message: `${lang.errorOccurred}" - "${JSON.stringify(err)}` }
      return res.status(500).json(error);
    }
  });

export default router.handler();
