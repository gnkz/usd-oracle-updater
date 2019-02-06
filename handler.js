"use strict";

const app = require("./src/app");

module.exports.run = async () => {
  try {
    await app();
  } catch (err) {
    console.log(err);
  }
};
