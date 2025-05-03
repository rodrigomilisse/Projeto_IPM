window.onload = function () {
	toggleAction();
	desenharTemperatura();
	desenharHumidade();
	desenharChuva();
	desenharVento();
	desenharConsumo();
}

function obterUltimos7DiasSemana() {
	const nomesDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
	const hoje = new Date();
	const etiquetas = [];

	for (let i = 6; i >= 0; i--) {
		const data = new Date();
		data.setDate(hoje.getDate() - i);
		etiquetas.push(i === 0 ? 'Hoje' : nomesDias[data.getDay()]);
	}
	return etiquetas;
}

function desenharGrafico(idCanvas, tituloGrafico, unidades, dados) {
	const contexto = document.getElementById(idCanvas).getContext('2d');
	new Chart(contexto, {
		type: 'line',
		data: {
			labels: obterUltimos7DiasSemana(),
			datasets: [{
				label: tituloGrafico,
				data: dados,
				borderColor: 'green',
				fill: false
			}]
		},
		options: {
			responsive: true,
			scales: {
				y: {
					title: {
						display: true,
						text: unidades
					}
				}
			}
		}
	});
}

// Chamadas individuais dos gráficos
function desenharTemperatura() {
	desenharGrafico('temperatureChart', 'Temperatura', 'ºC', [24, 23, 22, 24, 25, 26, 27]);
}

function desenharHumidade() {
	desenharGrafico('humidityChart', 'Humidade', '%', [65, 66, 64, 62, 61, 63, 65]);
}

function desenharChuva() {
	desenharGrafico('rainChart', 'Chuva', 'mm', [0, 5, 0, 10, 0, 0, 0]);
}

function desenharVento() {
	desenharGrafico('windChart', 'Vento', 'km/h', [30, 35, 40, 45, 30, 32, 30]);
}

function desenharConsumo() {
	desenharGrafico('consumptionChart', 'Consumo', 'L/dia', [180, 190, 200, 210, 220, 230, 240]);
}
