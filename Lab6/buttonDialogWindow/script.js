$(document).ready(function() {
	$("#showButton").click(function() {
		$("#dialog").show();
		$(this).prop("disabled", true);
		$(this).text("acum nici nu mai poti");
		$(this).css("cursor", "not-allowed");
	});
	
	$("#hideButton").click(function() {
		$("#dialog").hide();
		$("#showButton").prop("disabled", false);
		$("#showButton").text("nu da click");
		$("#showButton").css("cursor", "pointer");
	});
	
	function resize(newWidth, newHeight) {
		$("#dialog").outerWidth(newWidth);
		$("#dialog").outerHeight(newHeight);
	}

	var doResize = 0;
	$(this).mousemove(function(e) {
		if (doResize === 1) { // at this point the mouse is clicked (otherwise mouseup would've been triggered => doResize = 0)
			let position = $("#dialog").position()
			let marginTop = parseInt($("#dialog").css("marginTop"))
			let marginLeft = parseInt($("#dialog").css("marginLeft"))
			resize(e.clientX - position.left - marginLeft, e.clientY - position.top - marginTop)
		}
	});
	$(this).mouseup(function(e) {
		doResize = 0;
	});
	$(this).mousedown(function(e) {
		let dialogBox = document.getElementById("dialog");
		if (dialogBox.style.display === "" || dialogBox.style.display === "none") {
			return; // don't care about the dialog box if it hasn't been displayed yet
		}
		let dialogBoxData = dialogBox.getBoundingClientRect();
		
		dialogBox = $("#dialog");
		let leftOffset = dialogBoxData.x;
		let topOffset = dialogBoxData.y;
		let borderWidth = parseInt(dialogBox.css('border-top-width')); // for now I'll assume that all borders have the same width
		if (borderWidth < 10) {
			borderWidth = 10; // if the border is too small, it's almost imposible to click on it
		}
		let width = dialogBoxData.width; // dialogBoxData.width = 2 * border + inner width
		let height = dialogBoxData.height; // same but for heights
		
		let x = e.clientX - leftOffset;
		let y = e.clientY - topOffset;

		// upper and lower borders => x - leftMargin in [0; width], y - topMargin in [0; borderWidth] U [height - borderWidth; height];
		// left and right borders => x - leftMargin in [0; borderWidth] U [width - borderWidth; width], y - topMargin in [0; height]
		if (((0 <= x && x <= width) && ((0 <= y && y <= borderWidth) || (height - borderWidth <= y && y <= height))) || 
			(((0 <= x && x <= borderWidth) || (width - borderWidth <= x && x <= width)) && (0 <= y && y <= height))){
			doResize = 1;
		}
	});
})