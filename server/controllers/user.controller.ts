import { Request, Response } from "express";
import UserModel from "../mongodb/models/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const signUp = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, username } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      `${process.env.SECRET}`,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ email: result.email, username: result.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      `${process.env.SECRET}`,
      { expiresIn: "1h" }
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export { signUp, signIn };
