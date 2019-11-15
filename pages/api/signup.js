import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./../../models/User";
import connectDB from "./../../utils/connectDb";

const signupRouter = async (req, res) => {
  const {
    method,
    body: { name, email, password }
  } = req;

  // Make sure there's a DB connection
  connectDB();

  const allUsers = await UserModel.find();

  switch (method) {
    case "GET":
      return res.status(200).json(allUsers);
    case "POST":
      try {
        // 1. See if user already exists in DB
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
          console.log("userExists", userExists);
          return res
            .status(422)
            .send(`The email address ${email} already exists!`);
        }

        // 2. Hash user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save user in DB

        const newUser = new UserModel({
          name,
          email,
          password: hashedPassword
        });

        await newUser.save();

        // 4. Create token for new user
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
          .json({ msg: `A server error has happend! Error: ${error}` });
      }

    default:
      return res.status(405).json({ msg: "Server Error!" });
  }
};

export default signupRouter;
