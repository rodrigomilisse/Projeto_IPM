function mudarEstado(estado) {
	const botaoAtivar = document.getElementById("ativar");
	const botaoDesativar = document.getElementById("desativar");

	if (estado === 'ativar') {
		botaoAtivar.classList.add("ativado");
		botaoDesativar.classList.remove("ativado");
	} else {
		botaoDesativar.classList.add("ativado");
		botaoAtivar.classList.remove("ativado");
	}
}

function confirmarAcao() {
	alert("Alterações confirmadas!");
	location.reload();
}

function cancelarAcao() {
	alert("Alterações canceladas!");
	location.reload();
}