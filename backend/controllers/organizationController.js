const Organization = require('../models/Organization');

exports.createOrganization = async (req, res) => {
  const org = await Organization.create(req.body);
  res.status(201).json(org);
};

exports.getAllOrganizations = async (req, res) => {
  const orgs = await Organization.find();
  res.json(orgs);
};
