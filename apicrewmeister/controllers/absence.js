import Absence from "../models/Absence.js";

export const createAbsence = async (req, res, next) => {
  const newAbsence = new Absence(req.body);
  try {
    try {
      let resp = await Absence.find({ startDate: req.body.startDate });

      if (resp.length > 0 && resp.some((e) => e.userId === req.body.userId)) {
        //avoid doublicated recored for user at that day's date
        res.status(401).json({
          message: ` for this date you added one before! ${req.body.startDate}`,
        });
      } else {
        try {
          const savedAbsence = await newAbsence.save();
          res.status(200).json(savedAbsence);
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

export const getAbsences = async (req, res, next) => {
  const limitValue = req.query.limit || 10;
  const skipValue = req.query.page || 0;

  try {
    let total = await Absence.count();
    let query = {};
    let _get = req.query;
    _get.type ? (query.type = _get.type) : "";
    _get.userId ? (query.userId = _get.userId) : "";
    _get.startDate ? (query.startDate = { $gte: _get.startDate }) : "";
    _get.endDate ? (query.endDate = { $lt: _get.endDate }) : "";
    const absences = await Absence.find(query)
      .limit(limitValue)
      .skip(limitValue * skipValue - limitValue);

    res
      .status(200)
      .json({ status: "success", totlal: absences.length, absences: absences });
  } catch (err) {
    next(err);
  }
};
export const deleteAbsence = async (req, res, next) => {
  try {
    let result = await Absence.find({ userId: req.body.startDate });
    if (result.length > 0)
      res.status(200).json({ message: "Absence removed successfully" });
    else res.status(200).json({ message: "There is no absence,on this date!" });
  } catch (err) {
    next(err);
  }
};
