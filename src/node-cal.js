/*
 * node-cal
 * nodejs calendar module
 * exports for the functions
 *
 * ohnx was here (2015)
 *
 */

'use strict';

var exports = module.exports = {};
var event = require('./event.js');
var cal = require('./calendar.js');

exports.CalEvent = event.CalEvent;
exports.RepeatingCalEvent = event.RepeatingCalEvent;
exports.Calendar = cal.Calendar;
exports.calFromJSON = cal.calFromJSON;
exports.repeatWeekly = event.repeatWeekly;
exports.eventFromJSON = event.eventFromJSON;
