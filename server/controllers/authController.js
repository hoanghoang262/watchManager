import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Member from "../models/member.js";
import { JWT_SECRET } from "../config.js";
import { connectDB } from "../db.js"; // Import kết nối database

export const register = async (req, res) => {
  const { membername, password, name, YOB } = req.body;

  try {
    // Check if membername already exists
    const existingMember = await Member.findOne({ membername });
    if (existingMember) {
      return res.status(400).json({ error: "Membername already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new member
    const member = new Member({
      membername,
      password: hashedPassword,
      name,
      YOB,
    });

    // Save member to database
    await member.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("Error registering member:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { membername, password } = req.body;
  try {
    const member = await Member.findOne({ membername });

    if (member && (await bcrypt.compare(password, member.password))) {
      const token = jwt.sign(
        {
          _id: member._id,
          membername: member.membername,
          isAdmin: member.isAdmin,
        },
        JWT_SECRET
      );
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error logging in member:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
