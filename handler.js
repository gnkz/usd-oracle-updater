"use strict";

const app = require("./src/app");

module.exports.run = async () => {
  try {
    await app();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
