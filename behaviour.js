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

function mudarValores() {
  const zona = document.getElementById("zona").value;
  
  let humidade, temperatura, luminosidade, nivelBateria, statusRega, corFundoBotao, dataRega;
  
  // Alterar valores por zona selecionada
  if (zona === "zona1") {
    humidade = "62%";
    temperatura = "20°C";
    luminosidade = "Média";
    nivelBateria = "85%";
    statusRega = "Desativado";
    corFundoBotao = "#FF8989";

  } else if (zona === "zona2") {
    humidade = "71%";
    temperatura = "25°C";
    luminosidade = "Baixa";
    nivelBateria = "91%";
    statusRega = "Ativado";
    corFundoBotao = "#A1DD70"

  } else if (zona === "zona3") {
    humidade = "55%";
    temperatura = "13°C";
    luminosidade = "Baixa";
    nivelBateria = "72%";
    statusRega = "Desativado";
    corFundoBotao = "#FF8989"

  } else if (zona === "zona4") {
    humidade = "68%";
    temperatura = "22°C";
    luminosidade = "Média";
    nivelBateria = "88%";
    statusRega = "Ativado";
    corFundoBotao = "#A1DD70"
  }

  // Atualizar valores HTML
  document.getElementById("humidade").innerText = humidade;
  document.getElementById("temperatura").innerText = temperatura;
  document.getElementById("luminosidade").innerText = luminosidade;
  document.getElementById("nivel-bateria").innerText = nivelBateria;
  document.getElementById("status").innerText = statusRega;
  document.getElementById("dataRega").value = dataRega;

  const botao = document.getElementById("status");
  botao.classList.remove("botao-desativado", "botao-ativado");
  botao.classList.add(corFundoBotao); 
}

function agendarRega() {
  const dataRega = document.getElementById("dataRega").value;

  // Se uma data foi selecionada
  if (dataRega) {
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
  } else {
    alert("Por favor, selecione uma data e hora para agendar a rega.");
  }
}


window.onload = function() {
  if (window.location.pathname.includes("main-page.html")) { 
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
    const regasMostrar = regasOrdenadas.slice(0, 3);

    // Se existir pelo menos uma rega para mostrar
    if (regasMostrar.length > 0) {
      // Para cada rega criar os elementos necessários
      regasMostrar.forEach((rega) => {
        const div = document.createElement("div");
        div.classList.add("linha-zona");

        const nome = document.createElement("span");
        nome.classList.add("nome");
        nome.textContent = rega.zona;

        const data = document.createElement("span");
        data.classList.add("data");
        rega.data = formatarData(rega.data);
        data.textContent = `${rega.data}`;

        div.appendChild(nome);
        div.appendChild(data);

        regasContainer.appendChild(div);
      });
    } else {
      // Se não houver regas agendadas
      const div = document.createElement("div");
      div.textContent = "Nenhuma rega agendada.";
      regasContainer.appendChild(div);
    }
  }
};

function formatarData(recData) {
  const data = new Date(recData);

  const dia = data.getDate().toString().padStart(2, '0');  // Dia com 2 dígitos, se só tiver 1 começar em 0
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');  // Mês com 2 dígitos, se só tiver 1 começar em 0 (adicionar 1 pois getMonth Jan = 0, Fev = 1, ...)
  const ano = data.getFullYear();
  const horas = data.getHours().toString().padStart(2, '0');  // Hora com 2 dígitos, se só tiver 1 começar em 0
  const minutos = data.getMinutes().toString().padStart(2, '0');  // Minutos com 2 dígitos se só tiver 1 começar em 0

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}