const Monastery = require('../models/Monastery');

exports.getAllMonasteries = async (req, res) => {
  const monasteries = await Monastery.find({ approved: true });
  res.json(monasteries);
};

exports.createMonastery = async (req, res) => {
  const monastery = await Monastery.create(req.body);
  res.status(201).json(monastery);
};

exports.approveMonastery = async (req, res) => {
  const monastery = await Monastery.findById(req.params.id);
  if (!monastery) return res.status(404).json({ message: 'Monastery not found' });
  monastery.approved = true;
  await monastery.save();
  res.json(monastery);
};
