"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "books",
      [
        {
          id: 11,
          full_name: "M Huda",
          clan_name: null,
          email: "mhuda@gmail.com",
          phone_number: null,
          ticket_id: 1,
          passenger_id: 8,
          seat_id: 999,
          total_booking: 1,
          total_price: 9999999,
          booking_code: "123jad",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          full_name: "M Huda",
          clan_name: "N",
          email: "mhuda@gmail.com",
          phone_number: null,
          ticket_id: 2,
          passenger_id: 9,
          seat_id: 888,
          total_booking: 2,
          total_price: 9999999,
          booking_code: "000jad",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};