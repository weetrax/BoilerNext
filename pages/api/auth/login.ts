import { connectToDatabase } from "./../../../lib/database/index";
import { ironOptions } from "../../../lib/session";
import { lang } from "../../../constants/lang";
import { ResponseError } from "../../../types";
import { User } from "../../../lib/database/models/User";
import { withIronSessionApiRoute } from "iron-session/next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  // get user from database then:

  if (req.method === "POST") {
    connectToDatabase();

    const { email, password } = req.body;

    let error: ResponseError = {
      message: "",
    };

    User.findOne({ email: email }, function (err: any, user: any) {
      if (err) {
        error.message = lang.passwordInvalid.fr;
        return res.status(500).json(error);
      }
      if (!user) {
        error.message = lang.passwordInvalid.fr;
        return res.status(400).json(error);
      }

      // test a matching password
      user.comparePassword(
        password,
        async function (err: any, isMatch: boolean) {
          if (err) {
            error.message = lang.errorOccurred.fr;
            return res.status(500).json(error);
          }
          if (!isMatch) {
            error.message = lang.passwordInvalid.fr;
            return res.status(400).json(error);
          } else {
            req.session.user = user;
            await req.session.save();
            res.status(200).json(user);
          }
        }
      );
    });
  }
}, ironOptions);
