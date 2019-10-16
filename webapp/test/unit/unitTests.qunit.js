/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"dk/sorenviggo/ui5/jspdf/jsPDF_Create/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});