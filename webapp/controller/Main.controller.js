sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"dk/sorenviggo/ui5/jspdf/jsPDF_Create/utils/PdfCreator"
], function (Controller, PdfCreator) {
	"use strict";

	return Controller.extend("dk.sorenviggo.ui5.jspdf.jsPDF_Create.controller.Main", {
		onInit: function () {

		},
		
		onOpenPDF: function(oEvent){
			PdfCreator.createPdfDoc();
			PdfCreator.openFile();
		},

		onSavePDF: function(oEvent){
			PdfCreator.createPdfDoc();
			PdfCreator.saveFile("Test.pdf");
		}

	});
});