function toggleAction() {
	const root = document.documentElement;
	const toggle = document.getElementById("toggleSwitch");
	const isDark = localStorage.getItem("darkmode") === "true";
	console.log(isDark);
	if (toggle) toggle.checked = isDark;

	if (isDark) {
		root.style.setProperty('--main-background', 'black');
		root.style.setProperty('--nav-bar-color', 'black');
		root.style.setProperty('--menu-color', 'grey');
		root.style.setProperty('--container-shadow', '0 2px 6px rgba(255, 255, 255, 0.5)');
	} else {
		root.style.setProperty('--main-background', '#48A6A7');
		root.style.setProperty('--nav-bar-color', '#7D8C8C');
		root.style.setProperty('--menu-color', '#D3D3D3');
		root.style.setProperty('--container-shadow', '0 2px 6px rgba(0, 0, 0, 1)');
	}
}

function toggleChanged() {
	const toggle = document.getElementById("toggleSwitch");
	localStorage.setItem("darkmode", toggle.checked);
	toggleAction();
}
