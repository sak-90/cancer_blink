import patientPriorityModel from "../model/patientPriorityModel.js";

const getPriority = async (req, res) => {
  try {
    const patients = await patientPriorityModel
      .find({})
      .sort({ cancerPercentage: -1 });
    res.status(200).json(patients);
  } catch (err) {
    throw err;
  }
};

const postPriority = async (req, res) => {
  try {
    const name = req.body.name;
    const cancerPercentage = req.body.cancerPercentage;
    const priority = new patientPriorityModel({
      name: name,
      cancerPercentage: cancerPercentage,
    });
    const savedPriority = await priority.save();
    res.status(200).json(savedPriority);
  } catch (err) {
    throw err;
  }
};

export default { getPriority, postPriority };
