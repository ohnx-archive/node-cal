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
var event = new node_cal.CalEvent("\'something\'", new Date(), new Date(), "\"quote test\"\nsomething cool", "1 Magic Way\nCity\nCountry");
mainCal.addEvent(event);
event = new node_cal.CalEvent("\'something 2\'", new Date(), new Date(), "\"quote test\"\nsomething cool", "1 Magic Way\nCity\nCountry");
mainCal.addEvent(event);

var testICal = mainCal.toICal();
var testJSON = mainCal.toJSON();

var testCal = node_cal.calFromJSON(testJSON);
var testParseICal = testCal.toICal();

if(testParseICal !== testICal) {
    console.log("Original:\n" + testICal);
    console.log("Parsed:\n" + testParseICal);
    throw "The calendars did not match";
}

console.log("The test worked!");
