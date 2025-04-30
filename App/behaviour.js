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

let isSyncing = false;

function sincronizarDropdowns(dropdown) {
  if (isSyncing) {
    return
  }
  
  isSyncing = true;

  let zona1 = document.getElementById("zona1");
  let zona2 = document.getElementById("zona2");

  if (dropdown === zona1) {
    zona2.value = zona1.value;
  } else {
    zona1.value = zona2.value;
  }

  isSyncing = false;
}

function confirmar() {
  const resposta = confirm("Tem a certeza que deseja confirmar esta automatização?");
  if (resposta) {
      alert("Automatização criada!");
  } else {
      alert("Automatização cancelada!");
  }
}

function cancelar() {
  alert("Automatização cancelada!");
  window.location.href = "main-page.html";
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

function cancelarCond() {
  alert("Condição cancelada!");
  window.location.href = "automatizacao.html";
}

function confirmarCond() {

  const urlParams = new URLSearchParams(window.location.search);
  const tipoAcao = urlParams.get("acao");

  let valor;

    const tipoCondicao = document.getElementById("type-cond").value;

    const condicaoComparacao = document.getElementById("size-cond").value;
    if (tipoCondicao === "temp") {
      valor = document.getElementById("numeroTemp").value;
    } else if (tipoCondicao === "hum") {
      valor = document.getElementById("numeroHum").value;
    }

    if (!valor) {
      alert("Por favor insira um valor válido no campo.");
    } else {
    let luminosidade = null;
    if (tipoCondicao === "lum") {
        luminosidade = document.getElementById("luminosidade").value;
    }

    const dadosCondicao = {
      tipoAcao: tipoAcao,
      tipoCondicao: tipoCondicao,
      condicaoComparacao: condicaoComparacao,
      valor: valor,
      luminosidade: luminosidade
    };

    localStorage.setItem("dadosCondicao", JSON.stringify(dadosCondicao));
    alert("Automatização criada com sucesso!");
    window.location.href = "automatizacao.html";
  }
}

/* Mostrar em "automatizacao.html" a condição
   adicionada no campo correto */
window.onload = function() {
  if (window.location.pathname === "automatizacao.html") { 
    const dadosCondicao = JSON.parse(localStorage.getItem("dadosCondicao"));

    // Adicionar, dependendo das variáveis escolhidas ao texto final
    if (dadosCondicao) {
      let condicaoTexto ="";
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