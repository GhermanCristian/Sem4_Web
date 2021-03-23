function showMenuByClass(menuClassName) {
	var menuItems = document.getElementsByClassName(menuClassName);
	for (var i = 0; i < menuItems.length; i++) {
		menuItems[i].style.display = "block";
	}
}

function hideMenuByClass(menuClassName) {
	var menuItems = document.getElementsByClassName(menuClassName);
	for (var i = 0; i < menuItems.length; i++) {
		menuItems[i].style.display = "none";
	}
}

window.onclick = function(event) {
	if (!event.target.closest('#mainMenuButton') && !event.target.closest('#myDropdown')) {
		hideMenuByClass("submenu");
	}

	var baseClassName = ".submenu";
	var baseButtonName = "#submenuButton";
	var baseName = "submenu";
	for (var i = 1; i <= 5; i++) {
		if (!event.target.closest(baseClassName + i) && !event.target.closest(baseButtonName + i)) {
			hideMenuByClass(baseName + i);
		}
	}
}