/*
 * node-cal
 * nodejs calendar module
 * tests and sample usage
 *
 * ohnx was here (2015)
 *
 */

'use strict';

var node_cal = require('../index.js');

var mainCal = new node_cal.Calendar("coolcal", "everything");
var event = new node_cal.CalEvent("something", new Date(), new Date(), "something cool", "room 101");

mainCal.addEvent(event);

var testICal = mainCal.toICal();
var testJSON = mainCal.toJSON();

console.log("The test worked!");
