let isSyncing = false;
let counter = 0;

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
    localStorage.setItem("dados" + counter++, JSON.stringify(dadosCondicao));
    alert("Automatização criada com sucesso!");
    window.location.href = "automatizacao.html";
  }
}

window.onload = function() {
    mostrarCondicoes("ligar");
    mostrarCondicoes("desligar");
}

function mostrarCondicoes(tipoAcao) { 
    const aId = tipoAcao === "ligar" ? "ligar-container" : "desligar-container";
    const a = document.getElementById(aId);
    for (let i = 0; i < localStorage.length - 1; i++) {
        let dados = localStorage.getItem("dados" + i);
        if (dados) {
            const dadosCondicao = JSON.parse(dados);
            if (dadosCondicao.tipoAcao === tipoAcao ){
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
            console.log(condicaoTexto);
            console.log(i);
            console.log(counter);
                }
            }            
        }
    }      
}