import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isEmail } from "validator";

import UserModel from "./../../models/User";
import connectDB from "./../../utils/connectDB";

const loginRouter = async (req, res) => {
  const {
    method,
    body: { email, password }
  } = req;

  // Make sure there's a DB connection
  connectDB();

  switch (method) {
    case "POST":
      try {
        // 1. Validate login form
        if (!isEmail(email)) {
          return res
            .status(422)
            .send(`The email address ${email} is not known!`);
        }

        // 2. Check if user exists in DB
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
          return res
            .status(422)
            .send(`There is no user with this email address known!`);
        }

        // 3. Check if password is correct
        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if (!passwordIsCorrect) {
          return res.status(422).send(`Password is incorrect!`);
        }

        // 4. Create token
        const token = await jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d"
          }
        );

        return res.status(200).send(token);
      } catch (err) {
        return res.status(500).send(`Server error at POST: ${err}`);
      }
    default:
      return res.status(405).send("Server Error!");
  }
};

export default loginRouter;
