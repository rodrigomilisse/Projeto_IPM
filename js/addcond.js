function confirmarCond() {

	const urlParams = new URLSearchParams(window.location.search);
	const tipoAcao = urlParams.get("acao");
	const zona = urlParams.get("zona");
	const tipoCondicao = document.getElementById("type-cond").value;
	const condicaoComparacao = document.getElementById("size-cond").value;

	let valor = null;

	switch (tipoCondicao) {
		case "temp":
			valor = document.getElementById("numeroTemp").value;
			break;

		case "hum":
			valor = document.getElementById("numeroHum").value;
			break;

		case "lum":
			valor = document.getElementById("luminosidade").value;
			break;
	}

	const dadosCondicao = {
		zona,
		tipoAcao,
		tipoCondicao,
		condicaoComparacao,
		valor
	};

	if (checkCondition(dadosCondicao) == "failed") {
		return;
	}
	const condicoes = JSON.parse(localStorage.getItem("condicoes") || "[]");

	condicoes.push(dadosCondicao);
	localStorage.setItem("condicoes", JSON.stringify(condicoes));
	alert("Condição Adicionada com sucesso!");
	window.location.href = "automatizacao.html";
}

function cancelarCond() {
	alert("Condição cancelada!");
	window.location.href = "automatizacao.html";
}

function changeConditionType() {
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

function checkCondition(dadosCondicao) {
	const MIN_HUMIDADE = 0;
	const MAX_HUMIDADE = 100;
	const MIN_TEMP = -25;
	const MAX_TEMP = 75;
	console.log("checkin");
	if (!dadosCondicao.valor) {
		alert("Por favor insira um valor válido no campo.");
		return "failed";
	}
	if (dadosCondicao.tipoCondicao === "hum"
		&& dadosCondicao.valor < MIN_HUMIDADE || dadosCondicao.valor > MAX_HUMIDADE) {
		alert("Escolha uma humidade entre " + MIN_HUMIDADE + "% e " + MAX_HUMIDADE + "%");
		return "failed";
	}

	if (dadosCondicao.tipoCondicao === "temp"
		&& dadosCondicao.valor < MIN_TEMP || dadosCondicao > MAX_TEMP) {
		alert("Escolha uma temperatura entre " + MIN_TEMP + "ºC e " + MAX_TEMP + "ºC");
		return "failed";
	}

	let check = "passed";
	const condicoes = JSON.parse(localStorage.getItem("condicoes") || "[]");
	condicoes.forEach(condicao => {
		if (condicao.zona !== dadosCondicao.zona
			|| condicao.tipoCondicao !== dadosCondicao.tipoCondicao) {
			return;
		}
		console.log(1);
		if (condicao.tipoAcao !== dadosCondicao.tipoAcao
			&& condicao.condicaoComparacao === dadosCondicao.condicaoComparacao) {
			return;
		}
		console.log(2);
		let maior, menor;
		if (condicao.condicaoComparacao === "maior que") {
			maior = condicao;
			menor = dadosCondicao;
		} else {
			maior = dadosCondicao;
			menor = condicao;
		}

		maiorValor = maior.valor;
		menorValor = menor.valor;

		[maiorValor, menorValor] = [maior.valor, menor.valor].map(v => {
			switch (v) {
				case "baixa": return 1;
				case "media": return 2;
				case "alta": return 3;
			}
		});

		if (parseInt(maiorValor) >= parseInt(menorValor)) {
			console.log(3);
			return;
		}
		console.log(maior, maiorValor, menor, menorValor);

		alert("Não pode escolher condições redudantes nem conflituosas");
		check = "failed";
	});
	return check;
}