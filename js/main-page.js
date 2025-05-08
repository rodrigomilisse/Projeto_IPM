function formatarData(recData) {
	const data = new Date(recData);

	const dia = data.getDate().toString().padStart(2, '0');  // Dia com 2 dígitos, se só tiver 1 começar em 0
	const mes = (data.getMonth() + 1).toString().padStart(2, '0');  // Mês com 2 dígitos, se só tiver 1 começar em 0 (adicionar 1 pois getMonth Jan = 0, Fev = 1, ...)
	const ano = data.getFullYear();
	const horas = data.getHours().toString().padStart(2, '0');  // Hora com 2 dígitos, se só tiver 1 começar em 0
	const minutos = data.getMinutes().toString().padStart(2, '0');  // Minutos com 2 dígitos se só tiver 1 começar em 0

	return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}

function mainLoad() {

	const regasContainer = document.getElementById("regas-agendadas");

	if (!regasContainer) {
		return;
	}

	const regas = JSON.parse(localStorage.getItem("regasAgendadas")) || [];
	const agora = new Date();

	const regasFuturas = regas.filter(rega => new Date(rega.data) > agora); // Filtrar para regas no futuro apenas (ignorar regas já passadas)

	// Ordenar regas mais próximas do atual
	const regasOrdenadas = regasFuturas
		.map(rega => {
			rega.dataHora = new Date(rega.data);
			rega.diferenca = Math.abs(agora - rega.dataHora);
			return rega;
		})
		.sort((a, b) => a.diferenca - b.diferenca); // Ordenar da menor para a maior diferença de tempo

	// Mostrar 3 regas mais próximas
	const regasMostrar = regasOrdenadas.slice(0, 8);

	// Se existir pelo menos uma rega para mostrar
	if (regasMostrar.length > 0) {
		// Para cada rega criar os elementos necessários
		regasMostrar.forEach((rega, index) => {
			const div = document.createElement("div");
			div.classList.add("linha-zona");

			const nome = document.createElement("span");
			nome.classList.add("nome");
			nome.textContent = rega.zona;

			const data = document.createElement("span");
			data.classList.add("data");
			rega.data = formatarData(rega.data);
			data.textContent = `${rega.data}`;


			// Botão de cancelamento
			const cancelButton = document.createElement("button");
			cancelButton.textContent = "Cancelar";
			cancelButton.classList.add("cancelar-btn");
			cancelButton.style.backgroundColor = "red"; // color workaround
			cancelButton.addEventListener("click", () => {
				console.log("clicked");
				cancelarRega(index); // Cancelar rega ao clicar
			});

			div.appendChild(nome);
			div.appendChild(data);
			div.appendChild(cancelButton);

			regasContainer.appendChild(div);
		});
	} else {
		// Se não houver regas agendadas
		const div = document.createElement("div");
		div.textContent = "Nenhuma rega agendada.";
		regasContainer.appendChild(div);
	}
};

function cancelarRega(index) {
	const regas = JSON.parse(localStorage.getItem("regasAgendadas")) || [];

	// Remover a rega do array
	regas.splice(index, 1);

	// Atualizar o localStorage
	localStorage.setItem("regasAgendadas", JSON.stringify(regas));

	// Atualizar a página
	//mainLoad();

	location.reload();
}

