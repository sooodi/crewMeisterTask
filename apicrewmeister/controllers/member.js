import Member from "../models/Member.js";

export const createMember = async (req, res, next) => {
  const newMember = new Member(req.body);
  try {
    try {
      let resp = await Member.find({ userId: req.body.userId });

      if (resp.length > 0)
        res.status(401).json({
          message: "user is existed!",
        });
      else {
        try {
          const savedMember = await newMember.save();
          res.status(200).json(savedMember);
        } catch (err) {
          res.status(405).json({
            message: "Error,somthing went wrong",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res
      .status(200)
      .json({ status: "success", totlal: members.length, members: members });
  } catch (err) {
    next(err);
  }
};
