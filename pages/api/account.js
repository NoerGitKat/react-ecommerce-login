import jwt from "jsonwebtoken";
import UserModel from "./../../models/User";

const accountRouter = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const {
          headers: { authorization }
        } = req;

        // Only get account if the request has token
        if (!authorization) {
          return res.status(401).send("No authorization token!");
        }

        // If token exists, verify
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: userId });

        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).send("User not found!");
        }
      } catch (err) {
        return res.status(403).send(`Token is invalid! ${err}`);
      }
    default:
      return res.status(405).send("Server Error!");
  }
};

export default accountRouter;
