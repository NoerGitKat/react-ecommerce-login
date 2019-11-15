import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./../../models/User";
import connectDB from "./../../utils/connectDb";
import { isEmail, isLength } from "validator";

const signupRouter = async (req, res) => {
  const {
    method,
    body: { name, email, password }
  } = req;

  // Make sure there's a DB connection
  connectDB();

  switch (method) {
    case "POST":
      try {
        // 1. Validate user input
        if (!isLength(name, { min: 3, max: 10 })) {
          return res
            .status(422)
            .send("Name must be between 3 to 10 characters long!");
        }
        if (!isLength(password, { min: 6 })) {
          return res
            .status(422)
            .send("Your password must be at least 6 characters long!");
        }
        if (!isEmail(email)) {
          return res.status(422).send("Your email must be valid!");
        }

        // 2. See if user already exists in DB
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
          console.log("userExists", userExists);
          return res
            .status(422)
            .send(`The email address ${email} already exists!`);
        }

        // 3. Hash user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Save user in DB

        const newUser = new UserModel({
          name,
          email,
          password: hashedPassword
        });

        await newUser.save();

        // 5. Create token for new user
        const jwtToken = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d"
          }
        );

        return res.status(200).json(jwtToken);
      } catch (error) {
        return res
          .status(500)
          .send(`A server error has happend! Error: ${error}`);
      }

    default:
      return res.status(405).send("Server Error!");
  }
};

export default signupRouter;
