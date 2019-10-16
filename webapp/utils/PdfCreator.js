sap.ui.define([
		"dk/sorenviggo/ui5/jspdf/jsPDF_Create/utils/jsPdfUtil"
	], function (jsPdfUtil) {
		"use strict";

		return {
			
			data: null,
			
			createPdfDoc: function(data){
				this.data = data;
				jsPdfUtil.initialize();
				this.createContent();
				jsPdfUtil.finish();
			},
			
			openFile: function(){
				jsPdfUtil.openFile();
			},
			
			saveFile: function(fileName){
				jsPdfUtil.saveFile(fileName);
			},
			
			createContent: function(){
				jsPdfUtil.doc.setFontSize(24).setFontStyle("normal");
				jsPdfUtil.writeTextCenter("Testpage");
				jsPdfUtil.addLine();
				jsPdfUtil.doc.setFontSize(16).setFontStyle("normal");
				jsPdfUtil.writeTextCenter("Margins (Top/Bot/Left/Right): " + jsPdfUtil.marginTop + "/" + jsPdfUtil.marginBot + "/" + jsPdfUtil.marginLeft + "/" + jsPdfUtil.marginRight);
				jsPdfUtil.addLine();
				jsPdfUtil.writeTextLeft("Left justified text");
				jsPdfUtil.writeTextCenter("Centered text");
				jsPdfUtil.writeTextRight("Right justified text");
				jsPdfUtil.doc.setFontSize(20).setFontStyle("bold");
				jsPdfUtil.writeTextLeft("Left bold underlined text size 20.", {bUnderline: true});
				jsPdfUtil.writeTextCenter("Center bold underlined text size 20.", {bUnderline: true});
				jsPdfUtil.writeTextRight("Right bold underlined text size 20.", {bUnderline: true});
				jsPdfUtil.doc.setFontSize(16).setFontStyle("normal");
				jsPdfUtil.addLine(3);
				jsPdfUtil.writeTextLeft("Above: 3 empty lines added. Below: 1 added line + Full and partial lines.");
				jsPdfUtil.addLine();
				jsPdfUtil.uline();
				jsPdfUtil.addLine();
				jsPdfUtil.uline({xPos: 50}); //Line starting at 50 mm and ends at right margin
				jsPdfUtil.addLine();
				jsPdfUtil.uline({width:50}); //Line starting at left margin with length 50 mm
				jsPdfUtil.uline({xPos: 100, width:50}); //Line written on same yPos as previous. Line starting at 100mm with length 50 mm
				jsPdfUtil.addLine();
				jsPdfUtil.uline({width:50, isCentered: true}); //Centered line with length 50 mm
				jsPdfUtil.writeTextLeft("Left justified text, wordwrapped to max width 50 mm.", {maxWidth:50});
				jsPdfUtil.writeTextCenter("Centered text, wordwrapped to max width 60 mm.", {maxWidth:60});
				jsPdfUtil.writeTextRight("Right justified text, wordwrapped to max width 70 mm.", {maxWidth:70});
				jsPdfUtil.addLine();
				jsPdfUtil.writeTextLeft("Left justified text, maxWidth 50 mm with border and padding 2 mm", {maxWidth:50, hasBorder:true, padding:2});
				jsPdfUtil.writeTextLeft("Left justified text, maxWidth 50 mm with border and padding 3 mm and xPos=30", {maxWidth:50, xPos:30, hasBorder:true, padding:3});
				jsPdfUtil.newPage();
				jsPdfUtil.writeTextLeft("<NewPage>");
				jsPdfUtil.writeTextCenter("Centered text, maxWidth: 60 mm with border and padding 4 mm", {maxWidth:60, hasBorder:true, padding:4});
				jsPdfUtil.writeTextCenter("Centered text, maxWidth: 60 mm with border and padding 4 mm and xPos=40", {maxWidth:60, xPos: 40, hasBorder:true, padding:4});
				jsPdfUtil.writeTextCenter("Some arbitrary text");
				jsPdfUtil.addLine();
				jsPdfUtil.writeTextRight("Right justified text, maxWidth: 60 mm with border and padding 4 mm", {maxWidth:60, hasBorder:true, padding:4});
				jsPdfUtil.writeTextRight("Right justified text, maxWidth: 60 mm with border and padding 4 mm and xPos=40", {maxWidth:60, xPos: 40, hasBorder:true, padding:4});
				
				jsPdfUtil.newPage();
				jsPdfUtil.writeTextLeft("Left justified image:");
				jsPdfUtil.incYPos(2);
				jsPdfUtil.writeImageLeft("/images/Skyline.jpg", {width:100, height:55});
				
				jsPdfUtil.writeTextCenter("Centered image:");
				jsPdfUtil.incYPos(2);
				jsPdfUtil.writeImageCenter("/images/Skyline.jpg", {width:100, height:55});
				
				jsPdfUtil.writeTextRight("Right justified image:");
				jsPdfUtil.incYPos(2);
				jsPdfUtil.writeImageRight("/images/Skyline.jpg", {width:100, height:55});
				
				jsPdfUtil.writeTextLeft("Images with default size on same line:");
				jsPdfUtil.incYPos(2);
				jsPdfUtil.writeImageLeft("/images/Skyline.jpg", {bNoInc:true});
				jsPdfUtil.writeImageCenter("/images/Skyline.jpg", {bNoInc:true});
				jsPdfUtil.writeImageRight("/images/Skyline.jpg", {bNoInc:true});

				
			}


		};
	}
);