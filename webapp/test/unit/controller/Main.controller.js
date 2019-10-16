/*global QUnit*/

sap.ui.define([
	"dk/sorenviggo/ui5/jspdf/jsPDF_Create/controller/Main.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main Controller");

	QUnit.test("I should test the Main controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});