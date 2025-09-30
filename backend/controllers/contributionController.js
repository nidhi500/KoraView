import Contribution from "../models/Contribution.js";

export const getContributions = async (req, res) => {
  try {
    const monks = await Contribution.find({ type: "monk" });
    const locals = await Contribution.find({ type: "local" });
    const researchers = await Contribution.find({ type: "researcher" });

    res.json({ monks, locals, researchers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveContribution = async (req, res) => {
  try {
    const { id } = req.params;
    const contribution = await Contribution.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    res.json(contribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectContribution = async (req, res) => {
  try {
    const { id } = req.params;
    await Contribution.findByIdAndDelete(id);
    res.json({ message: "Contribution rejected and deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
