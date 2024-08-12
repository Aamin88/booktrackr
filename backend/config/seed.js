const BooksSeedSchema = require("../models/seedModel.model");
const seedData = require("../public/data/seedData.json");

const seedDB = async () => {
  await BooksSeedSchema.deleteMany();
  await BooksSeedSchema.insertMany([...seedData]);
};

module.exports = seedDB;
