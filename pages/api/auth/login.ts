import { connectToDatabase } from './../../../lib/database/index';
import { createRouter } from 'next-connect';
import { lang } from '../../../constants/lang';
import { ResponseError } from '../../../types';
import { User } from '../../../lib/database/models/User';
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

    const { email, password } =
      req.body;

    let error: ResponseError = {
      message: ""
    }

    User.findOne({ email: email }, function (err: any, user: any) {
      if (err) {
        error = { ...error, message: lang.passwordInvalid.fr }
        return res.status(500).json(error);
      }
      if (!user) {
        error = { ...error, message: lang.passwordInvalid.fr }
        return res.status(500).json(error);
      }

      // test a matching password
      user.comparePassword(password, function (err: any, isMatch: boolean) {
        if (err) {
          error = { ...error, message: lang.errorOccurred.fr }
          return res.status(500).json(error);
        }
        if (!isMatch) {
          error = { ...error, message: lang.passwordInvalid.fr }
          return res.status(500).json(error);
        }
        else {
          res.status(200).json(user);
        }
      });
    })
  });

export default router.handler();
