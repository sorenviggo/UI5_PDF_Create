sap.ui.define([
		"dk/sorenviggo/ui5/jspdf/jsPDF_Create/libs/jspdfmin153"
	], function (jsPDFlib) {
		"use strict";

		return {
			
			//Find jsPDF source on https://cdnjs.com/libraries/jspdf
			
			getJsPdfDoc: function(){
				var doc = new jsPDF(); 
				return doc; 
			}

		};
	}
);