$(document).ready(function() {
	$("#myButton").click(function() {
		$("#dialog").toggle();
	});
	
	$(this).mousemove(function(e){
		let dialogBox = document.getElementById("dialog");
		let dialogBoxData = dialogBox.getBoundingClientRect();
		if (dialogBox.style.display === "" || dialogBox.style.display === "none") {
			return; // don't care about the dialog box if it hasn't been displayed yet
		}
		
		dialogBox = $("#dialog");
		let leftMargin = dialogBoxData.x;
		let topMargin = dialogBoxData.y;
		let borderWidth = parseInt(dialogBox.css('border-top-width')); // for now I'll assume that all borders have the same width
		let width = dialogBoxData.width; // dialogBoxData.width = 2 * border + inner width
		let height = dialogBoxData.height; // same but for heights*/
		
		let x = e.clientX - leftMargin;
		let y = e.clientY - topMargin;

		// upper and lower margins => x - leftMargin in [0; width], y - topMargin in [0; borderWidth] U [height - borderWidth; height];
		// left and right margins => x - leftMargin in [0; borderWidth] U [width - borderWidth; width], y - topMargin in [0; height]
		if (((0 <= x && x <= width) && ((0 <= y && y <= borderWidth) || (height - borderWidth <= y && y <= height))) || 
			(((0 <= x && x <= borderWidth) || (width - borderWidth <= x && x <= width)) && (0 <= y && y <= height))){
			var myButton = document.getElementById("myButton")
			myButton.style.backgroundColor = "red";
		}
		else {
			var myButton = document.getElementById("myButton")
			myButton.style.backgroundColor = "black";
		}
		
	});
})