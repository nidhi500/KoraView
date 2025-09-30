// controllers/contributionController.js
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
