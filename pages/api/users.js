import UserModel from "./../../models/User";
import jwt from "jsonwebtoken";

const usersRouter = async (req, res) => {
  const {
    method,
    headers: { authorization }
  } = req;
  switch (method) {
    case "GET":
      try {
        // Get user id from the token
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

        // Get all users (besides logged in user) from model
        const users = await UserModel.find({ _id: { $ne: userId } }).sort({
          name: "asc"
        });

        return res.status(200).json(users);
      } catch (err) {
        return res.status(500).send(`Server Error! ${err}`);
      }
    default:
      return res.status(405).send("Method not allowed!");
  }
};

export default usersRouter;
