function showMenuDropdown(menuName) {
	var menu = document.getElementById(menuName);
	menu.style.display = "block";
	var children = menu.childNodes;
	for (i = 0; i < children.length; i++) {
		if (children[i].nodeName == "BUTTON" || children[i].nodeName == "DIV") {
			children[i].style.display = "block";
		}
	}
}

function hideWithChildren(item) {
	item.style.display = "none";
	console.log(item);
	var children = item.childNodes;
	for (i = 0; i < children.length; i++) {
		if (children[i].nodeName == "BUTTON" || children[i].nodeName == "DIV") {
			children[i].style.display = "none";
		}
	}
}

// close everything if we click outside the main menu
window.onclick = function(event) {
	if (!event.target.closest('#mainMenuButton') && !event.target.closest('#myDropdown')) {
		var dropdowns = document.getElementsByClassName("submenu");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			hideWithChildren(openDropdown);
		}
	}
}