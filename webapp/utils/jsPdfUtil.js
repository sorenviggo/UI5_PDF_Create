sap.ui.define([
		"dk/sorenviggo/ui5/jspdf/jsPDF_Create/utils/jsPdfProxy"
	], function (jsPdfProxy) {
		"use strict";

		return {

			namespace: "dk.sorenviggo.ui5.jspdf.jsPDF_Create",
			doc: null,
			marginTop: 20,
			marginBot: 20,
			marginLeft: 20,
			marginRight: 20,
			pageWidth: 0,
			pageHeigth: 0,
			pageNum: 1,
			xPos: null,
			yPos: null,

			initialize: function(){
				this.doc = jsPdfProxy.getJsPdfDoc();
				this.pageWidth = this.doc.internal.pageSize.getWidth();
				this.pageHeight = this.doc.internal.pageSize.getHeight();
				this.xPos = this.marginLeft;
				this.yPos = this.marginTop;
				this.pageNum = 1;
			},
			
			finish: function(){
				//Write footers for all pages.
				for(var i = 1; i <= this.pageNum; i++){
					this.doc.setPage(i);
					var text = "Page " + i + " / " + this.pageNum;
					this.writeFooter(text);
				}
			},

			saveFile: function(fileName){
				this.doc.save(fileName);
			},
			
			openFile: function(){
				this.doc.output("dataurlnewwindow");
			},
			
			uline: function(settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginLeft; }
				if(!oSettings.width){ oSettings.width = this.pageWidth - this.marginRight - oSettings.xPos; }
				if(oSettings.isCentered){ oSettings.xPos = oSettings.xPos + ( ( this.pageWidth - oSettings.xPos - this.marginRight ) / 2 ) - ( oSettings.width / 2 ); }
				this.doc.line(oSettings.xPos, this.yPos, oSettings.xPos + oSettings.width, this.yPos);
			},

			writeTextLeft: function(text, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginLeft; }
				var xPos = oSettings.xPos;
				oSettings.xPos += oSettings.padding;
				if(!oSettings.maxWidth) { oSettings.maxWidth = this.pageWidth - this.marginRight - oSettings.xPos; }
				var maxWidth = oSettings.maxWidth;
				oSettings.maxWidth -= ( 2 * oSettings.padding );
				//Store current global values.
				var yPos = this.yPos;
				var pNum = this.pageNum;
				if(!oSettings.bNoInc){
					this.incYPos(oSettings.padding);
				}
				var lines = this.wordWrap(text, oSettings.maxWidth);
				for(var i = 0; i < lines.length; i++){
					this.writeTextLeftSingle(lines[i], oSettings);
				}
				//We only support border when all text is on the same page.
				if(pNum === this.pageNum){
					if(oSettings.hasBorder){
						//Note: There will be some added white space over the first line of the box. This is because of the textheight being greater than the actual height of the text.
						this.doc.rect(xPos, yPos, maxWidth, this.yPos - yPos + oSettings.padding, "S");
						if(!oSettings.bNoInc){ this.incYPos(oSettings.padding);	}
					}
				}
			},
			
			writeTextLeftSingle: function(text, settings){
				var oSettings = this.getSettings(settings);
				var textHeight = this.doc.getTextDimensions(text).h;
				if (!oSettings.bNoInc){
					this.incYPos(textHeight);
				}
				this.doc.text(text, oSettings.xPos, this.yPos);
				if(oSettings.bUnderline){
					var textWidth = this.doc.getTextDimensions(text).w;
					this.yPos += 0.5;
					this.doc.line(oSettings.xPos, this.yPos, oSettings.xPos + textWidth, this.yPos);
				}
			},

			writeTextCenter: function(text, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginLeft; }
				if(!oSettings.maxWidth) { oSettings.maxWidth = this.pageWidth - this.marginRight - oSettings.xPos; }
				var maxWidth = oSettings.maxWidth;
				oSettings.maxWidth -= ( 2 * oSettings.padding );
				//Store current global values.
				var yPos = this.yPos;
				var pNum = this.pageNum;
				if(!oSettings.bNoInc){ this.incYPos(oSettings.padding); }
				var lines = this.wordWrap(text, oSettings.maxWidth);
				for(var i = 0; i < lines.length; i++){
					this.writeTextCenterSingle(lines[i], oSettings);
				}
				//We only support border when all text is on the same page.
				if(pNum === this.pageNum){
					if(oSettings.hasBorder){
						//Note: There will be some added white space over the first line of the box. This is because of the textheight being greater than the actual height of the text.
						var xPos = oSettings.xPos + ( ( this.pageWidth - oSettings.xPos - this.marginRight ) / 2) - (oSettings.maxWidth / 2);
						this.doc.rect(xPos - oSettings.padding, yPos, maxWidth, this.yPos - yPos + oSettings.padding, "S");
						if(!oSettings.bNoInc){ this.incYPos(oSettings.padding);	}
					}
				}
			},
			
			writeTextCenterSingle: function(text, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginLeft; }
				var textWidth = this.doc.getTextDimensions(text).w;
				var textHeight = this.doc.getTextDimensions(text).h;
				var pageWidth = this.doc.internal.pageSize.getWidth();
				var xPos = oSettings.xPos + ( ( pageWidth - oSettings.xPos - this.marginRight ) / 2) - (textWidth / 2);
				//Increment y-Pos BEFORE adding text (as text writes from bottom left corner)
				if (!oSettings.bNoInc){
					this.incYPos(textHeight);
				}
				this.doc.text(text,xPos, this.yPos);
				if(oSettings.bUnderline){
					this.yPos += 0.5;
					this.doc.line(xPos, this.yPos, xPos + textWidth, this.yPos);
				}
//				return {xPos: xPos};
			},

			writeTextRight: function(text, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginRight; } //Note: oSettings.xPos is RIGHT offset for this.
				if(!oSettings.maxWidth) { oSettings.maxWidth = this.pageWidth - this.marginLeft - oSettings.xPos; }
				var maxWidth = oSettings.maxWidth; //Local maxWidth is including padding
				oSettings.maxWidth -= ( 2 * oSettings.padding ); //oSettings.maxWidth is without padding
				var xPos = this.pageWidth - oSettings.xPos - maxWidth; //Note:Local xPos is LEFT offset.
				oSettings.xPos += oSettings.padding;
				//Store current global values.
				var yPos = this.yPos;
				var pNum = this.pageNum;
				if(!oSettings.bNoInc){
					this.incYPos(oSettings.padding);
				}
				var lines = this.wordWrap(text, oSettings.maxWidth);
				for(var i = 0; i < lines.length; i++){
					this.writeTextRightSingle(lines[i], oSettings);
				}
				//We only support border when all text is on the same page.
				if(pNum === this.pageNum){
					if(oSettings.hasBorder){
						//Note: There will be some added white space over the first line of the box. This is because of the textheight being greater than the actual height of the text.
						this.doc.rect(xPos, yPos, maxWidth, this.yPos - yPos + oSettings.padding, "S");
						if(!oSettings.bNoInc){ this.incYPos(oSettings.padding);	}
					}
				}
			},

			writeTextRightSingle: function(text, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginRight; } //Note: oSettings.xPos is RIGHT offset for this.
				var textWidth = this.doc.getTextDimensions(text).w;
				var textHeight = this.doc.getTextDimensions(text).h;
				var xPos = this.pageWidth - oSettings.xPos - textWidth; //Note:Local xPos is LEFT offset.
				if (!oSettings.bNoInc){
					this.incYPos(textHeight);
				}
				this.doc.text(text,xPos, this.yPos);
				if(oSettings.bUnderline){
					this.yPos += 0.5;
					this.doc.line(xPos, this.yPos, xPos + textWidth, this.yPos);
				}
			},

			writeImageLeft: function(path, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginLeft; }
				if(!oSettings.type){ oSettings.type = "png"; }
				if(!oSettings.width){ oSettings.width = 20; }
				if(!oSettings.height){ oSettings.height = 20; }
				var imgPath = this.getModulePath() + path;
				var img = new Image();
				img.src = imgPath;
				this.doc.addImage(img, oSettings.type, oSettings.xPos, this.yPos, oSettings.width, oSettings.height);
				//Increment y-Pos AFTER adding image (as image writes from top left corner)
				if (!oSettings.bNoInc){
					this.incYPos(oSettings.height);
				}
			},
			
			writeImageCenter: function(path, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.type){ oSettings.type = "png"; }
				if(!oSettings.width){ oSettings.width = 20; }
				if(!oSettings.height){ oSettings.height = 20; }
				var xPos = (this.pageWidth / 2) - (oSettings.width / 2);
				var imgPath = this.getModulePath() + path;
				var img = new Image();
				img.src = imgPath;
				this.doc.addImage(img, oSettings.type, xPos, this.yPos, oSettings.width, oSettings.height);
				//Increment y-Pos AFTER adding image (as image writes from top left corner)
				if (!oSettings.bNoInc){
					this.incYPos(oSettings.height);
				}
			},

			writeImageRight: function(path, settings){
				var oSettings = this.getSettings(settings);
				if(!oSettings.xPos){ oSettings.xPos = this.marginRight; } //Note: oSettings.xPos is RIGHT offset.
				if(!oSettings.type){ oSettings.type = "png"; }
				if(!oSettings.width){ oSettings.width = 20; }
				if(!oSettings.height){ oSettings.height = 20; }
				var xPos = this.pageWidth - oSettings.xPos - oSettings.width; //Note:Local xPos is LEFT offset.
				var imgPath = this.getModulePath() + path;
				var img = new Image();
				img.src = imgPath;
				this.doc.addImage(img, oSettings.type, xPos, this.yPos, oSettings.width, oSettings.height);
				//Increment y-Pos AFTER adding image (as image writes from top left corner)
				if (!oSettings.bNoInc){
					this.incYPos(oSettings.height);
				}
			},

			addLine: function(lines){
				var iLines = lines;
				if(!iLines){iLines = 1;}
				var textHeight = this.doc.getTextDimensions("dummy").h;
				for(var i = 1; i <= iLines; i++){
					this.incYPos(textHeight);
				}
			},
			
			incYPos: function(inc){
				var pageHeight = this.doc.internal.pageSize.getHeight();
				if(this.yPos + inc > pageHeight - this.marginBot){
					this.newPage();
				}else{
					this.yPos += inc;
				}
			},
			
			newPage: function(){
				this.pageNum++;
				this.doc.addPage();
				this.xPos = this.marginLeft;
				this.yPos = this.marginTop;
			},
			
			writeFooter: function(text){
				var string = text;
				if(!string){ string = "Page " + this.pageNum; }
				this.doc.setFontSize(10).setFontStyle("normal");
				var pageHeight = this.doc.internal.pageSize.getHeight();
				var textHeight = this.doc.getTextDimensions("dummy").h;
				this.yPos = pageHeight - ( this.marginBot / 2 ) + (textHeight / 2);
				this.writeTextCenter(string, {bNoInc:true});
				this.doc.setFontSize(16).setFontStyle("normal");
			},
			
			getSettings: function(settings){
				var oSettings = {};
				if(settings){
					oSettings = settings;
				}
				if(!oSettings.padding){oSettings.padding = 0;}
				return oSettings;
			},
			
			getModulePath: function(){
				return jQuery.sap.getModulePath(this.namespace);
			},
			
			wordWrap: function(text, maxWidth){
				var result = [];
				var iMaxWidth = maxWidth;
				if(!iMaxWidth){ 
					iMaxWidth = this.pageWidth - this.marginLeft - this.marginRight; 
				}
				var words = text.split(" ");
				var line = "";
				for(var i = 0; i < words.length; i++){
					var word = words[i];
					var wordWidth = this.doc.getTextDimensions(word).w;
					var lineWidth = this.doc.getTextDimensions(line).w;
					if (lineWidth + wordWidth <= iMaxWidth){
						//Max width not exceeded => Just add word to buffer.
						if(line.length === 0){
							line = word;
						}else{
							line += " " + word;
						}
					}else{
						//Max width of line exceeded.
						if (line.length > 0){
							//Something was already put in buffer => Add to result and reset buffer.
							result.push(line);
							line = "";
						}
						if (wordWidth < iMaxWidth){
							//Current word is shorter than max width => Just add it to buffer.
							line = word;
						}else{
							//Current word is longer than allowed maximum width of entire line (Note: Buffer will always be empty at this point.)
							for(var j = 0; j < word.length; j++){
								//Handle each character in the word.
								line += word[j]; //Append j'th character to buffer.
								lineWidth = this.doc.getTextDimensions(line).w;
								if (lineWidth > iMaxWidth){
									result.push(line);
									line = "";
								}
							}
						}
					}
				}
				//Something in buffer => Add it to result.
				if(line.length > 0){
					result.push(line);
				}
				return result;
			}
		};
	}
);