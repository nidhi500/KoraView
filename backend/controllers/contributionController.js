import Contribution from "../models/Contribution.js";

// Get all contributions (grouped by type)
export const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find();

    const grouped = {
      monks: contributions.filter(c => c.type === "monks" && !c.approved),
      locals: contributions.filter(c => c.type === "locals" && !c.approved),
      researchers: contributions.filter(c => c.type === "researchers" && !c.approved)
    };

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve a contribution
export const approveContribution = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Contribution.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject a contribution (delete it)
export const rejectContribution = async (req, res) => {
  try {
    const { id } = req.params;
    await Contribution.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
