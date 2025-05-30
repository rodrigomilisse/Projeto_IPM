/* Mostrar em "automatizacao.html" a condição
adicionada no campo correto */

renderConditions = function () {
	console.log("rendering");
	try {
		document.querySelectorAll(".add-cond").forEach(el => el.remove());

		const condicoes = JSON.parse(localStorage.getItem("condicoes")) || [];
		while (condicoes.length > 0) {
			let dadosCondicao = condicoes.pop();
			if (dadosCondicao.zona !== document.getElementById("zona").value) {
				continue;
			}

			// Adicionar, dependendo das variáveis escolhidas ao texto final
			if (dadosCondicao) {
				let condicaoTexto = "";
				if (dadosCondicao.tipoCondicao === "temp") {
					condicaoTexto += `Temperatura ${dadosCondicao.condicaoComparacao} ${dadosCondicao.valor} ºC<br>`;
				} else if (dadosCondicao.tipoCondicao === "hum") {
					condicaoTexto += `Humidade ${dadosCondicao.condicaoComparacao} ${dadosCondicao.valor}%<br>`;
				} else if (dadosCondicao.tipoCondicao === "lum") {
					condicaoTexto += `Luminosidade ${dadosCondicao.condicaoComparacao} ${dadosCondicao.valor}<br>`;
				}

				const div = document.createElement("div");
				div.innerHTML = condicaoTexto;
				div.style.marginBottom = "1vh";
				div.style.boxSizing = "border-box";
				div.style.width = "100%";
				div.classList.add("add-cond");

				if (dadosCondicao.tipoAcao === "ligar") {
					document.querySelector(".ligar-container").prepend(div);
				} else if (dadosCondicao.tipoAcao === "desligar") {
					document.querySelector(".desligar-container").prepend(div);
				}
			}
		}
	} catch (e) {
		localStorage.setItem("condicoes", []);
	}
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

function checkClear() {
	const zone = document.getElementById("zona").value;
	const condicoes = JSON.parse(localStorage.getItem("condicoes") || "[]");
	const clear = document.getElementById("clearConditions");
	clear.classList.add("deactivated-red");
	condicoes.forEach(c => {
		if (c.zona === zone) {
			console.log(c.zona);
			clear.classList.remove("deactivated-red");
			return;
		}
	})
}
function clearConditions() {
	console.log("clear");

	let condicoes = JSON.parse(localStorage.getItem("condicoes")) || [];
	let zona = document.getElementById("zona").value;
	condicoes = condicoes.filter(c => c.zona !== zona);

	localStorage.setItem("condicoes", JSON.stringify(condicoes));
	document.querySelectorAll(".add-cond").forEach(el => el.remove());
}