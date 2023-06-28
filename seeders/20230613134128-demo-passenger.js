"use strict";

const { DATEONLY } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "passengers",
      [
        {
          id: 77,
          first_name: "Christin",
          last_name: "Oei",
          birth_date: "2003-08-22",
          nik_number: "8080808080808080",
          nationality: "indonesia",
          passenger_role: "Dewasa",
          user_id: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          first_name: "Habbin",
          last_name: "Nofaylah",
          birth_date: "2002-04-25",
          nik_number: "8080808080808081",
          nationality: "Indonesia",
          passenger_role: "Dewasa",
          user_id: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          first_name: "There",
          last_name: "Nawangsih",
          birth_date: "2002-04-03",
          nik_number: "8080808080808082",
          nationality: "Indonesia",
          passenger_role: "Dewasa",
          user_id: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("passengers", null, {});
  },
};