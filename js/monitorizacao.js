function _getZoneInfo(zone) {
	const zoneInfo = {
		zona1: {
			humidade: "62%",
			temperatura: "20°C",
			luminosidade: "Média",
			battery: "85%",
			status: "Desativado",
			corFundoBotao: "#FF8989"
		},
		zona2: {
			humidade: "71%",
			temperatura: "25°C",
			luminosidade: "Baixa",
			battery: "91%",
			status: "Ativado",
			corFundoBotao: "#A1DD70"
		},
		zona3: {
			humidade: "55%",
			temperatura: "13°C",
			luminosidade: "Baixa",
			battery: "72%",
			status: "Desativado",
			corFundoBotao: "#FF8989"
		},
		zona4: {
			humidade: "68%",
			temperatura: "22°C",
			luminosidade: "Média",
			battery: "88%",
			status: "Ativado",
			corFundoBotao: "#A1DD70"
		}
	};
	return zoneInfo[zone];
}

function changeZone() {
	const zona = document.getElementById("zona").value;

	info = _getZoneInfo(zona);
	if (!info) {
		alert("Erro info");
		return;
	}

	let dataPoints = ["humidade", "temperatura", "luminosidade", "battery", "status"];
	dataPoints.forEach(d => {
		document.getElementById(d).innerText = info[d];
	});

	const botao = document.getElementById("status");
	botao.style.backgroundColor = info.corFundoBotao;
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

	if (botao.innerText === "Desativado") {
		botao.innerText = "Ativado";
		botao.classList.add("ativado");
	} else {
		botao.innerText = "Desativado";
		botao.classList.remove("ativado");
	}
}