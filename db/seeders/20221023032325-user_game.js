'use strict';
const bcrypt = require('bcrypt');

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
     await queryInterface.bulkInsert('user_games', [
      {
        username: 'sekarmk',
        password: await bcrypt.hash('secret123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'azarn',
        password: await bcrypt.hash('secret456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'madu',
        password: await bcrypt.hash('secret789', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user_games', null, {});
  }
};
