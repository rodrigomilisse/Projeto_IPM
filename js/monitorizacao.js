const active = "Ativado";
const deactivated = "Desativado";

let zoneInfo = {
	zona1: {
		humidade: "62%",
		temperatura: "20°C",
		luminosidade: "Média",
		battery: "85%",
		status: deactivated,
	},
	zona2: {
		humidade: "71%",
		temperatura: "25°C",
		luminosidade: "Baixa",
		battery: "91%",
		status: active
	},
	zona3: {
		humidade: "55%",
		temperatura: "13°C",
		luminosidade: "Baixa",
		battery: "72%",
		status: deactivated,
	},
	zona4: {
		humidade: "68%",
		temperatura: "22°C",
		luminosidade: "Média",
		battery: "88%",
		status: active
	}
};

function _getZoneInfo(zone) {
	return zoneInfo[zone];
}

function loadZoneInfo() {
	const zona = document.getElementById("zona").value;

	let info = _getZoneInfo(zona);
	if (!info) {
		alert("Erro info");
		return;
	}

	let dataPoints = ["humidade", "temperatura", "luminosidade", "battery", "status"];
	dataPoints.forEach(d => {
		document.getElementById(d).innerText = info[d];

		if (localStorage.getItem("darkmode")) { // color workaround
			document.getElementById(d).style.color = "white";
		}
	});

	const botao = document.getElementById("status");
	botao.style.backgroundColor = botao.innerText == active ? "var(--positive-color)" : "var(--negative-color)";
}

function agendarRega() {
	const date = document.getElementById("date").value;

	if (!date) {
		alert("Por favor, selecione uma data e hora para agendar a rega.");
		return;
	}
	// Se uma data foi selecionada
	// Exibir a data agendada
	const zona = document.getElementById("zona").value;
	const zonaTexto = document.querySelector(`#zona option[value="${zona}"]`).textContent;

	const regaAgendada = {
		data: date,
		zona: zonaTexto
	};

	const regas = JSON.parse(localStorage.getItem("regasAgendadas")) || [];

	regas.push(regaAgendada);

	localStorage.setItem("regasAgendadas", JSON.stringify(regas));

	alert(`A rega para ${zonaTexto} foi agendada para  ${date}`);
}

function ativarRega() {
	const botao = document.getElementById("status");
	let zona = document.getElementById("zona").value;

	if (botao.innerText === deactivated) {
		zoneInfo[zona].status = active;
		botao.style.backgroundColor = "var(--positive-color)";
	} else {
		zoneInfo[zona].status = deactivated;
		botao.style.backgroundColor = "var(--negative-color)";
	}
	loadZoneInfo();
}

let warned = false;
function checkDate() {
	const data = document.getElementById("date");
	const button = document.getElementById("next-rega-btn");
	if (!data || !data.value) {
		button.onclick = null;
		return;
	}

	const selectedDate = new Date(data.value);
	const now = new Date();

	if (selectedDate <= now) {
		button.onclick = null;
		if (!warned) {
			alert("Por favor insira uma data no futuro");
			warned = true;
		}
		return;
	}
	button.style.backgroundColor = "var(--positive-color)";
	button.style.cursor = "pointer";
	button.onclick = agendarRega;
}
