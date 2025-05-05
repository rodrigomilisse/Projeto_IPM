
function _getDetailedZoneInfo(zone) {
	let zoneInfo = {
		zone1: {
			temperature: { name: 'Temperatura', units: 'ºC', values: [24, 23, 22, 24, 25, 26, 27] },
			humidity: { name: 'Humidade', units: '%', values: [65, 66, 64, 62, 61, 63, 65] },
			rain: { name: 'Chuva', units: 'mm', values: [0, 5, 0, 10, 0, 0, 0] },
			wind: { name: 'Vento', units: 'km/h', values: [30, 35, 40, 45, 30, 32, 30] },
			consumption: { name: 'consumo de água', units: 'L/dia', values: [180, 190, 200, 210, 220, 230, 240] }
		}, zone2: {
			temperature: { name: 'Temperatura', units: 'ºC', values: [22, 23, 24, 22, 21, 22, 23] },
			humidity: { name: 'Humidade', units: '%', values: [70, 72, 71, 69, 68, 70, 71] },
			rain: { name: 'Chuva', units: 'mm', values: [2, 0, 5, 0, 1, 0, 3] },
			wind: { name: 'Vento', units: 'km/h', values: [20, 25, 22, 18, 20, 23, 21] },
			consumption: { name: 'consumo de água', units: 'L/dia', values: [150, 160, 155, 158, 152, 159, 161] }
		},

		zone3: {
			temperature: { name: 'Temperatura', units: 'ºC', values: [28, 29, 30, 31, 30, 29, 28] },
			humidity: { name: 'Humidade', units: '%', values: [50, 48, 47, 49, 51, 50, 52] },
			rain: { name: 'Chuva', units: 'mm', values: [0, 0, 0, 0, 0, 0, 1] },
			wind: { name: 'Vento', units: 'km/h', values: [10, 12, 15, 11, 13, 14, 10] },
			consumption: { name: 'consumo de água', units: 'L/dia', values: [300, 310, 320, 315, 305, 310, 312] }
		},

		zone4: {
			temperature: { name: 'Temperatura', units: 'ºC', values: [18, 19, 17, 18, 19, 20, 21] },
			humidity: { name: 'Humidade', units: '%', values: [80, 82, 79, 78, 81, 83, 84] },
			rain: { name: 'Chuva', units: 'mm', values: [10, 12, 8, 15, 9, 11, 13] },
			wind: { name: 'Vento', units: 'km/h', values: [40, 42, 38, 41, 43, 39, 40] },
			consumption: { name: 'consumo de água', units: 'L/dia', values: [120, 125, 130, 128, 126, 129, 127] }
		}
	}
	return zoneInfo[zone];
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

function drawGraph(idCanvas, tituloGrafico, unidades, dados) {
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

function drawGraphs() {

	const urlParams = new URLSearchParams(window.location.search);
	const zone = urlParams.get("zone");

	const info = _getDetailedZoneInfo(zone);

	const dataPoints = ['temperature', 'humidity', 'rain', 'wind', 'consumption'];
	dataPoints.forEach(d => {
		drawGraph(d, info[d].name, info[d].units, info[d].values);
	});
}
