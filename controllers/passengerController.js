const { passenger } = require("../models");

const getPassenger = async (req, res) => {
  try {
    const passengers = await passenger.findAll();
    res.status(200).json({
      message: "data seluruh penumpang Flytix",
      passengers,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getPassengerById = async (req, res) => {
  try {
    const { id } = req.params;
    const onePassenger = await passenger.findOne({ where: { id } });
    res.status(200).json({
      passenger: onePassenger,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const addPassenger = async (req, res) => {
  const { first_name, last_name, birth_date, nik_number, nationality, passenger_role } = req.body;
  try {
    const newPassenger = await passenger.create({ first_name, last_name, birth_date, nik_number, nationality, passenger_role });
    res.status(200).json({
      message: "data penumpang berhasil ditambahkan",
      newPassenger,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updatePassenger = async (req, res) => {
  const { first_name, last_name, birth_date, nik_number, nationality, passenger_role } = req.body;
  try {
    const { id } = req.params;
    await passenger.update({ first_name, last_name, birth_date, nik_number, nationality, passenger_role }, { where: { id } });
    res.status(200).json({
      message: "data penumpang berhasil diubah",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    await passenger.destroy({ where: { id } });
    res.status(200).json({
      message: "data penumpang berhasil dihapus",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getPassenger,
  getPassengerById,
  addPassenger,
  updatePassenger,
  deletePassenger,
};