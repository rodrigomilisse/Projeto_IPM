/* Mostrar em "automatizacao.html" a condição
   adicionada no campo correto */

renderConditions = function () {
	console.log("rendering");
	//if (window.location.pathname === "automatizacao.html") {
	document.querySelectorAll("add-cond").forEach(el => el.remove());

	const condicoes = JSON.parse(localStorage.getItem("condicoes"));
	while (condicoes.length > 0) {
		let dadosCondicao = condicoes.pop();
		if (dadosCondicao.zona !== document.getElementById("zona").value) {
			console.log(dadosCondicao.zona + "!=");
			console.log(document.getElementById("zona").value);
			continue;
		}
		console.log(dadosCondicao.zona + "=");
		console.log(document.getElementById("zona").value);
		console.log(dadosCondicao);

		// Adicionar, dependendo das variáveis escolhidas ao texto final
		if (dadosCondicao) {
			let condicaoTexto = "";
			if (dadosCondicao.tipoCondicao === "temp") {
				condicaoTexto += `Temperatura ${dadosCondicao.condicaoComparacao} ${dadosCondicao.valor} ºC<br>`;
			} else if (dadosCondicao.tipoCondicao === "hum") {
				condicaoTexto += `Humidade ${dadosCondicao.condicaoComparacao} ${dadosCondicao.valor}%<br>`;
			} else if (dadosCondicao.tipoCondicao === "lum") {
				condicaoTexto += `Luminosidade ${dadosCondicao.luminosidade}<br>`;
			}

			const div = document.createElement("div");
			div.innerHTML = condicaoTexto;
			div.style.marginBottom = "10px";
			div.classList.add("add-cond");

			if (dadosCondicao.tipoAcao === "ligar") {
				document.querySelector(".ligar-container").prepend(div);
			} else if (dadosCondicao.tipoAcao === "desligar") {
				document.querySelector(".desligar-container").prepend(div);
			}
		}
	}
	//}
}
window.onload = function () {
	renderConditions();
}
function adicionarCondicaoLigar() {
	const zona = document.getElementById("zona").value;
	if (zona) {
		window.location.href = `adicionar_condicao.html?acao=ligar&zona=${encodeURIComponent(zona)}`;
	}
}

function adicionarCondicaoDesligar() {
	const zona = document.getElementById("zona").value;
	if (zona) {
		window.location.href = `adicionar_condicao.html?acao=desligar&zona=${encodeURIComponent(zona)}`;
	}
}