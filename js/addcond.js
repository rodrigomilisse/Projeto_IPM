function confirmarCond() {

	const urlParams = new URLSearchParams(window.location.search);
	const tipoAcao = urlParams.get("acao");
	const zona = urlParams.get("zona");
	const tipoCondicao = document.getElementById("type-cond").value;
	const condicaoComparacao = document.getElementById("size-cond").value;

	let valor = null;
	let luminosidade = null;

	switch (tipoCondicao) {
		case "temp":
			valor = document.getElementById("numeroTemp").value;
			if (!valor) {
				alert("Por favor insira um valor válido no campo.");
				return;
			} ("success");
			break;

		case "hum":
			valor = document.getElementById("numeroHum").value;
			if (!valor) {
				alert("Por favor insira um valor válido no campo.");
				return;
			}
			break;

		case "lum":
			luminosidade = document.getElementById("luminosidade").value;
			break;
	}

	const dadosCondicao = {
		zona,
		tipoAcao,
		tipoCondicao,
		condicaoComparacao,
		valor,
		luminosidade
	};
	const condicoes = JSON.parse(localStorage.getItem("condicoes") || "[]");

	console.log("success");
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