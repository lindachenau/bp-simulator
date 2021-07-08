'use strict';

const appointments = require("./generate-slots");

module.exports.handler = async (event, context, callback) => {
  try {
    const result = await appointments.generate(event);
    callback(null, result);
    context.succeed(event);
  } catch (err) {
    callback(err);
    context.fail(err);
  }
}