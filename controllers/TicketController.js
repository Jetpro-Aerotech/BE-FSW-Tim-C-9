const moment = require("moment/moment");
const { ticket, airport, flight } = require("../models");
const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");

const getTicket = catchAsync(async (req, res) => {
  await ticket.findAll({ include: [{ model: airport }, { model: flight }] }).then((tickets) => {
    res.status(200).json({ tickets });
  });
});

const getTicketById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ticket.findOne({ where: { id } }, { include: [{ model: airport }, { model: flight }] }).then((tickets) => {
    res.status(200).json({ tickets });
  });
});

const addTicket = catchAsync(async (req, res) => {
  const { price, type_of_class, airport_id, flight_id, passenger_id } = req.body;

  await ticket.create({ price, type_of_class, airport_id, flight_id, passenger_id }).then((data) => {
    res.status(201).json({ data });
  });
});

const filterTicket = catchAsync(async (req, res) => {
  const { departure_date, arrival_date, departure_location, arrival_location, type_of_class } = req.body;

  if (departure_date === "" || arrival_date === "" || departure_location === "" || arrival_location === "" || type_of_class === "") {
    return res.status(404).json({ message: "Please input a relevant data" });
  }
  const tickets = await ticket.findAll({
    where: { type_of_class: type_of_class },
    include: {
      model: flight,
      as: "flight",
      where: {
        departure_date: departure_date,
        arrival_date: arrival_date,
        departure_location: { [Op.substring]: `${departure_location}` },
        arrival_location: { [Op.substring]: `${arrival_location}` },
      },
    },
  });
  res.status(200).json({ tickets });
});

const searchTicket = catchAsync(async (req, res) => {
  const { dd, ad, dl, al, toc } = req.query;
  const tickets = await ticket.findAll({
    where: { type_of_class: toc },
    include: {
      model: flight,
      as: "flight",
      where: {
        departure_date: dd,
        arrival_date: ad,
        departure_location: { [Op.iLike]: `${dl}` },
        arrival_location: { [Op.iLike]: `${al}` },
      },
    },
  });
  res.status(200).json({ tickets });
});

module.exports = {
  getTicket,
  getTicketById,
  addTicket,
  //   updateTicket,
  //   deleteTicket,
  filterTicket,
  searchTicket,
};
