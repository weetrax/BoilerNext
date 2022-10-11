import countriesJson from "../../../constants/countries.json";
import isEmpty from "is-empty";
import { connectToDatabase } from "./../../../lib/database/index";
import { ICountry } from "./../../../types";
import { ironOptions } from "../../../lib/session";
import { IUser, ResponseError } from "../../../types";
import { lang } from "../../../constants/lang";
import { User } from "../../../lib/database/models/User";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function registerRoute(req, res) {
  // get user from database then:

  if (req.method === "POST") {
    let { username, email, password, city, country, zipCode, tel } = req.body;
    let error: ResponseError = {
      message: "",
    };

    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
      error.message = lang.errorOccurred.fr;
      return res.status(400).json(error);
    }

    connectToDatabase();

    /* Check country validity */
    if (
      !isEmpty(country) &&
      (country as ICountry).code &&
      !isEmpty((country as ICountry).code)
    ) {
      if (countriesJson.find((x) => x.code === (country as ICountry).code)) {
        country = countriesJson.find(
          (x) => x.code === (country as ICountry).code
        );
      }
    } else {
      error.message = lang.invalidCountry.fr;
      return res.status(400).json(error);
    }

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

    const user: IUser = {
      username,
      email,
      password,
      country,
      city,
      zipCode,
      tel,
      isAdmin: false,
      isVerified: false,
      createdAt: new Date(),
    };

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
