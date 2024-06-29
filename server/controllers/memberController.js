import Member from "../models/member.js";
import bcrypt from "bcrypt";

export const getAllMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

export const getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.memberId);
  res.json(member);
};

export const updateMember = async (req, res) => {
  if (req.user._id !== req.params.memberId) {
    return res
      .status(403)
      .json({ error: "You can only update your own profile" });
  }

  const { membername, name, YOB, password } = req.body;

  const updateData = { membername, name, YOB };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  const member = await Member.findByIdAndUpdate(
    req.params.memberId,
    updateData,
    { new: true }
  );
  res.json(member);
};

export const deleteMember = async (req, res) => {
  if (req.user._id !== req.params.memberId) {
    return res
      .status(403)
      .json({ error: "You can only delete your own profile" });
  }

  await Member.findByIdAndDelete(req.params.memberId);
  res.sendStatus(204);
};
