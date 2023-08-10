'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   //user 테이블에 데이터를 넣는다.
   await queryInterface.bulkInsert('Users', [
    {
      nickname: '박제니',
      email: 'park@block.com',
      password: 'password1',
      privatekey: 'privatekey1',
      address: 'address1',
      token_amount: 10.5,
      eth_amount: 2.3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nickname: '금리사',
      email: 'keum@block.com',
      password: 'password2',
      privatekey: 'privatekey2',
      address: 'address2',
      token_amount: 5.2,
      eth_amount: 1.1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nickname: '유로제',
      email: 'you@block.com',
      password: 'password3',
      privatekey: 'privatekey3',
      address: 'address3',
      token_amount: 8.7,
      eth_amount: 3.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nickname: '한지수',
      email: 'han@block.com',
      password: 'password4',
      privatekey: 'privatekey4',
      address: 'address3',
      token_amount: 8.7,
      eth_amount: 3.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});

  await queryInterface.bulkInsert('Posts', [
    {
      p_userId: 1,
      title: 'Post 1',
      content: 'Content of Post 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      p_userId: 2,
      title: 'Post 2',
      content: 'Content of Post 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      p_userId: 3,
      title: 'Post 3',
      content: 'Content of Post 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});


  await queryInterface.bulkInsert('NFTs', [
    {
      n_userId: 1,
      token_id: 1,
      ipfs_hash: 'ipfs_hash_1',
      tx_hash: 'tx_hash_1',
      description: 'NFT 1 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      n_userId: 2,
      token_id: 2,
      ipfs_hash: 'ipfs_hash_2',
      tx_hash: 'tx_hash_2',
      description: 'NFT 2 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      n_userId: 3,
      token_id: 3,
      ipfs_hash: 'ipfs_hash_3',
      tx_hash: 'tx_hash_3',
      description: 'NFT 3 description',
      createdAt: new Date(),
      updatedAt: new Date(),
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
  }
};
