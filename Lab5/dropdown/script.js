function showMenuByClass(menuClassName) {
	var menuItems = document.getElementsByClassName(menuClassName);
	for (i = 0; i < menuItems.length; i++) {
		menuItems[i].style.display = "block";
	}
}

function hideMenuByClass(menuClassName) {
	var menuItems = document.getElementsByClassName(menuClassName);
	for (i = 0; i < menuItems.length; i++) {
		menuItems[i].style.display = "none";
	}
}

function hideWithChildren(item) {
	item.style.display = "none";
	var children = item.childNodes;
	for (i = 0; i < children.length; i++) {
		if (children[i].nodeName == "BUTTON" || children[i].nodeName == "DIV") {
			children[i].style.display = "none";
		}
	}
}

window.onclick = function(event) {
	if (!event.target.closest('#mainMenuButton') && !event.target.closest('#myDropdown')) {
		var dropdowns = document.getElementsByClassName("submenu");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			hideWithChildren(openDropdown);
		}
	}
	
	var baseClassName = ".submenu";
	var baseButtonName = "#submenuButton";
	var baseName = "submenu";
	for (i = 1; i <= 5; i++) {
		if (!event.target.closest(baseClassName + i) && !event.target.closest(baseButtonName + i)) {
			hideMenuByClass(baseName + i);
		}
	}
}