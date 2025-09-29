import Monastery from "../models/Monastery.js";

export const getMonasteries = async (req, res) => {
  try {
    const monasteries = await Monastery.find();
    res.json(monasteries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveMonastery = async (req, res) => {
  try {
    const { id } = req.params;
    const monastery = await Monastery.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    res.json(monastery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
