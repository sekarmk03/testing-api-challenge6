'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('user_game_histories', [
      {
        user_id: 1,
        spend_time: 4344,
        result: 'win',
        score: 32431,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        spend_time: 2316,
        result: 'win',
        score: 11481,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        spend_time: 3254,
        result: 'lose',
        score: 15324,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        spend_time: 4223,
        result: 'draw',
        score: 15422,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user_game_histories', null, {});
  }
};
