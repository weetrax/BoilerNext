import { connectToDatabase } from "./../../../lib/database/index";
import { ironOptions } from "../../../lib/session";
import { lang } from "../../../constants/lang";
import { ResponseError } from "../../../types";
import { IUser, User } from "../../../lib/database/models/User";
import { withIronSessionApiRoute } from "iron-session/next";
import isEmpty from "is-empty";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  // get user from database then:

  if (req.method === "POST") {
    const { username, email, password } = req.body;
    let error: ResponseError = {
      message: "",
    };

    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
      error.message = lang.errorOccurred.fr;
      return res.status(400).json(error);
    }

    connectToDatabase();

    const user: IUser = {
      username,
      email,
      password,
      country: "",
      city: "",
      zipCode: "",
      tel: "",
      isAdmin: false,
      isVerified: false,
      createdAt: new Date(),
    };

    /* Check if the username is already taken */
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      error.message = lang.usernameAlreadyTaken.fr;
      return res.status(400).json(error);
    }

    /* Checking if the email is already taken. */
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      error.message = lang.emailAlreadyTaken.fr;
      return res.status(400).json(error);
    }

    try {
      const newUser = new User(user);
      const saved = await newUser.save();
      req.session.user = saved;

      await req.session.save();
      return res.status(200).json(saved);
    } catch (err) {
      error.message = `${lang.errorOccurred}" - "${JSON.stringify(err)}`;
      return res.status(500).json(error);
    }
  }
}, ironOptions);
