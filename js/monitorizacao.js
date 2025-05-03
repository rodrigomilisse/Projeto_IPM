function mudarValores() {
	const zona = document.getElementById("zona").value;

	const zonasInfo = {
		zona1: {
			humidade: "62%",
			temperatura: "20°C",
			luminosidade: "Média",
			nivelBateria: "85%",
			statusRega: "Desativado",
			corFundoBotao: "#FF8989"
		},
		zona2: {
			humidade: "71%",
			temperatura: "25°C",
			luminosidade: "Baixa",
			nivelBateria: "91%",
			statusRega: "Ativado",
			corFundoBotao: "#A1DD70"
		},
		zona3: {
			humidade: "55%",
			temperatura: "13°C",
			luminosidade: "Baixa",
			nivelBateria: "72%",
			statusRega: "Desativado",
			corFundoBotao: "#FF8989"
		},
		zona4: {
			humidade: "68%",
			temperatura: "22°C",
			luminosidade: "Média",
			nivelBateria: "88%",
			statusRega: "Ativado",
			corFundoBotao: "#A1DD70"
		}
	};

	const info = zonasInfo[zona];
	if (!info) return;

	document.getElementById("humidade").innerText = info.humidade;
	document.getElementById("temperatura").innerText = info.temperatura;
	document.getElementById("luminosidade").innerText = info.luminosidade;
	document.getElementById("nivel-bateria").innerText = info.nivelBateria;
	document.getElementById("status").innerText = info.statusRega;
	document.getElementById("dataRega").value = ""; // still undefined in original

	const botao = document.getElementById("status");
	botao.classList.remove("botao-desativado", "botao-ativado");
	botao.style.backgroundColor = info.corFundoBotao;
}

function agendarRega() {
	const dataRega = document.getElementById("dataRega").value;

	if (!dataRega) {
		alert("Por favor, selecione uma data e hora para agendar a rega.");
		return;
	}
	// Se uma data foi selecionada
	// Exibir a data agendada
	const zona = document.getElementById("zona").value;
	const zonaTexto = document.querySelector(`#zona option[value="${zona}"]`).textContent;

	const regaAgendada = {
		data: dataRega,
		zona: zonaTexto
	};

	const regas = JSON.parse(localStorage.getItem("regasAgendadas")) || [];

	regas.push(regaAgendada);

	localStorage.setItem("regasAgendadas", JSON.stringify(regas));

	alert(`A rega para ${zonaTexto} foi agendada para  ${dataRega}`);
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

function mudarTexto() {
	const tipoCondicao = document.getElementById("type-cond").value;
	const numeroTemp = document.getElementById("numeroTemp");
	const numeroHum = document.getElementById("numeroHum");
	const luminosidadeContainer = document.getElementById("luminosidade-container");

	numeroTemp.style.display = "none";
	numeroHum.style.display = "none";
	luminosidadeContainer.style.display = "none";

	if (tipoCondicao === "temp") {
		numeroTemp.style.display = "inline-block";
	} else if (tipoCondicao === "hum") {
		numeroHum.style.display = "inline-block";
	} else if (tipoCondicao === "lum") {
		luminosidadeContainer.style.display = "inline-block";
	}
}