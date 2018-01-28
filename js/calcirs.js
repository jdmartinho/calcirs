// Ano dos Rendimentos
var anoRendimentos;

// Deducoes a colecta
var despesasSaude;
var despesasEducacao;
var despesasGerais;
var despesasIVA;

// Variaveis
var rendimentoDependente;
var rendimentoIndependente;
var rendimentoCapital;
var rendimentoPredial;
var rendimentoPensoes;
var rendimentoColectavel;
var numContribuintes;
var dependentes3Anos;
var dependentes;
var ascendentes;
var estadoCivil; // 1 - Solteiro/Divorciado/Viuvo; 2 - Casado/Uniao de Facto
var familiaMonoparental;
var perdasCapitais;
var condominios;
var obras;
var impostoMunicipalImoveis;

function init() {
  var form = document.getElementById('taxForm');
  console.log("init");
  anoRendimentos = form.anoRendimentos.value;
  rendimentoDependente = form.rendimentoCatA.value || 0;
  rendimentoIndependente = form.rendimentoCatB.value || 0;
  rendimentoCapital = form.rendimentoCatE.value || 0;
  rendimentoPredial = form.rendimentoCatF.value || 0;
  rendimentoPensoes = form.rendimentoCatG.value || 0;
  dependentes = form.dependentesMais3Anos.value;
  dependentes3Anos = form.dependentesMenos3Anos.value;
  ascendentes = form.ascendentes.value;
  estadoCivil = form.estadoCivil.value;
  despesasSaude = form.despesasSaude.value;
  despesasEducacao = form.despesasEducacao.value;
  despesasIVA = form.despesasIVA.value;
  despesasGerais = form.despesasGerais.value;
  condominios = form.despesasCondominios.value;
  obras = form.despesasConservacao.value;
  impostoMunicipalImoveis = form.despesasIMI.value;
  propriedadeIntelectual = form.propriedadeIntelectual.checked;
  if (estadoCivil == "solteiro") {
    numContribuintes = 1;
  } else {
    numContribuintes = 2;
  }
  if (numContribuintes == 1 && (dependentes > 0 || dependentes3Anos > 0)) {
    familiaMonoparental = true;
  } else {
    familiaMonoparental = false;
  }
  console.log(rendimentoDependente)
  console.log(rendimentoIndependente)
  console.log(rendimentoCapital)
  console.log(rendimentoPredial)
  console.log(rendimentoPensoes)
  console.log(dependentes3Anos)
  console.log(dependentes)
  console.log(ascendentes)
  console.log(estadoCivil)
  console.log(despesasSaude)
  console.log(despesasEducacao)
  console.log(despesasIVA)
  console.log(despesasGerais)
  console.log(propriedadeIntelectual);

  var contexto;
  if(anoRendimentos == "2017"){
    contexto = new Contexto2017();
  } else {
    contexto = new Contexto2018();
  }

  contexto.algoritmo();
}

// Muda a visibilidade das despesas para Rendimentos Independentes
$("#rendimentoCatB").change(function() {
  var notSelected = $("#rendimentoCatB").val() <= 0;
  $(".despesasCatB").toggle(!notSelected);
});

// Muda a visibilidade das despesas para Rendimentos Prediais
$("#rendimentoCatF").change(function() {
  var notSelected = $("#rendimentoCatF").val() <= 0;
  $(".despesasCatF").toggle(!notSelected);
});
