// Constantes
// Limites superiores dos escaloes IRS
const Escalao1 = 7091;
const Escalao2 = 10700;
const Escalao3 = 20261;
const Escalao4 = 25000;
const Escalao5 = 36856;
const Escalao6 = 80640;
// Percentagens dos escaloes IRS
const Escalao1Percent = 0.145;
const Escalao2Percent = 0.23;
const Escalao3Percent = 0.285;
const Escalao4Percent = 0.35;
const Escalao5Percent = 0.37;
const Escalao6Percent = 0.45;
const Escalao7Percent = 0.48;
// Maximo imposto pago em cada escalao
const Escalao1MaxImposto = 1028.2;
const Escalao2MaxImposto = 830.07;
const Escalao3MaxImposto = 2724.89;
const Escalao4MaxImposto = 1658.65;
const Escalao5MaxImposto = 4386.72;
const Escalao6MaxImposto = 19702.8;
// Outros impostos
const ImpostoCapital = 0.28;
const taxaResidenteNaoHabitual = 0.20;
// Taxa Solidariedade
const TaxaSolidariedade1 = 0.025;
const TaxaSolidariedade2 = 0.05;
const LimiteSolidariedade1 = 80000;
const LimiteSolidariedade2 = 250000;
const ImpostoMaxSolidariedade1 = 4250;
// Deducoes especificas
const DeducaoRendDependente = 4104;
const DeducaoRendIndependentePercent = 0.75;
const LimiteDeducaoRendPensoes = 22500;
const DeducaoReduzidaRendPensoes = 0.8;
const DeducaoDependenteMenos3Anos = 725;
const DeducaoDependenteMais3Anos = 600;
const DeducaoAscendenteUnico = 635;
const DeducaoAscendentesMultiplos = 525;
// Quocientes
const QuocienteDependente = 0.3;
// Outros Valores
const rendMinimoMensalGarantido2010 = 475;
const indexanteApoioSocial = 421.32;
const minimoExistencia = indexanteApoioSocial * 1.5 * 14;
const limiteRendPropIntelectual = 10000;

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

  algoritmo();
}

function algoritmo() {
  var rendimentoTotal = parseFloat(rendimentoDependente) + parseFloat(rendimentoIndependente) +
    parseFloat(rendimentoCapital) + parseFloat(rendimentoPredial) + parseFloat(rendimentoPensoes);
  console.log("Rendimento Total: " + rendimentoTotal);
  // Calcular Deducoes Especificas
  //var dedEspecificas = calcDeducoesEspecificas();
  // Subtrair as deducoes especificas ao rendimento total para calcular o rendimento colectavel
  var rendColect = calcRendColectavel();
  console.log("Rendimento Colectavel: " + rendColect);
  // Apurar Taxa de Solidariedade devida
  var impostoSolidariedadeDevido = calcTaxaSolidariedadeDevida(rendColect);
  console.log("Imposto Solidariedade: " + impostoSolidariedadeDevido);
  // Calcular o quociente familiar
  var quocienteFamiliar = calcQuocienteFamiliar();
  console.log("Quociente Familiar: " + quocienteFamiliar);
  // Dividir o rendimento colectal pelo quociente familiar para calcular o rendimento colectavel corrigido
  var rendColectCorrigido = rendColect / quocienteFamiliar;
  console.log("Rendimento Colectavel Corrigido: " + rendColectCorrigido);
  // Calcular o imposto devido do rendimento colectavel corrigido
  var impostoApurado;
  if (anoRendimentos == 2017) {
    impostoApurado = calcImposto17(rendColectCorrigido);
  } else {
    impostoApurado = calcImposto(rendColectCorrigido);
  }
  console.log("Imposto Apurado: " + impostoApurado);
  // Multiplicar o imposto pelo quociente familiar para apurar a colecta total
  var colectaTotal = impostoApurado * quocienteFamiliar;
  console.log("Colecta Total: " + colectaTotal);
  // Adicionar imposto de Solidariedade a colecta total
  var colectaApuradaTotal = colectaTotal + impostoSolidariedadeDevido;
  console.log("Colecta Apurada Total: " + colectaApuradaTotal);
  // Calcular deducoes a colecta
  var deducoesColecta = calcDeducoesTotal(rendColect);
  console.log("Deducoes a Colecta: " + deducoesColecta);
  // Subtrair deducoes a colecta da colecta total para calcular o imposto devido
  var impostoFinal = calcColectaLiquida(colectaApuradaTotal, deducoesColecta);
  console.log("Imposto Final: " + impostoFinal);
  if (impostoFinal < 0) {
    impostoFinal = 0;
  }

  // Resultados
  $("#impostoAPagar").val(impostoFinal.formatMoney(2) + " €");
  $("#taxaEfectiva").val(((impostoFinal / rendimentoTotal) * 100).toFixed(2) + " %");
  $("#totalLiquido").val((rendimentoTotal - impostoFinal).formatMoney(2) + " €");
  return impostoFinal;
}

// Deducoes Especificas
function calcRendColectavel() {
  return calcRendColectavelCatA(rendimentoDependente) +
    calcRendColectavelCatB(rendimentoIndependente) +
    calcRendColectavelCatE(rendimentoCapital) +
    calcRendColectavelCatF(rendimentoPredial) +
    calcRendColectavelCatH(rendimentoPensoes);
}

function calcRendColectavelCatA(rendimentoDependente) {
  if (rendimentoDependente <= DeducaoRendDependente) {
    return 0;
  } else {
    return parseFloat(rendimentoDependente) - DeducaoRendDependente;
  }
}

function calcRendColectavelCatB(rendimentoIndependente) {
  if (rendimentoIndependente <= 0) {
    return 0;
  } else {
    result = parseFloat(rendimentoIndependente);
    if (propriedadeIntelectual) {
      var result = 0;
      var parcelaRendimentoIsento = rendimentoIndependente * 0.5;
      if (parcelaRendimentoIsento > limiteRendPropIntelectual) {
        parcelaRendimentoIsento = limiteRendPropIntelectual;
      }
      result = parseFloat(rendimentoIndependente) - parcelaRendimentoIsento;
    }
    return result * DeducaoRendIndependentePercent;
  }
}

function calcRendColectavelCatE(rendimentoCapital) {
  perdasCapitais = 0
  if (rendimentoCapital <= 0) {
    return 0;
  } else {
    var result = parseFloat(rendimentoCapital) - parseFloat(perdasCapitais);
    if(result < 0){
      return 0;
    } else {
      return result;
    }
  }
}

function calcRendColectavelCatF(rendimentoPredial) {
  if (rendimentoPredial <= 0) {
    return 0;
  } else {
    var result = rendimentoPredial - condominios - obras - impostoMunicipalImoveis;
    if (result <= 0) {
      return 0;
    } else {
      return result;
    }
  }
}

function calcRendColectavelCatH(rendimentoPensoes) {
  var result;
  if (rendimentoPensoes <= LimiteDeducaoRendPensoes) {
    result = rendimentoPensoes - DeducaoRendDependente;
    if (result <= 0) {
      return 0;
    } else {
      return result;
    }
  } else {
    // Necessario abater 20% do valor superior ao limite da deducao
    var parteAbater = DeducaoRendDependente - ((rendimentoPensoes - LimiteDeducaoRendPensoes) * 0.2);
    if (parteAbater < 0) {
      parteAbater = 0;
    }
    result = rendimentoPensoes - parteAbater;
    if (result <= 0) {
      return 0;
    } else {
      return result;
    }
  }
}

// Taxa de Solidariedade
function calcTaxaSolidariedadeDevida(rendimentoColectavel) {
  var result;
  if (rendimentoColectavel > LimiteSolidariedade1 && rendimentoColectavel <= LimiteSolidariedade2) {
    console.log("Taxa de Solidariedade 1")
    result = (rendimentoColectavel - LimiteSolidariedade1) * TaxaSolidariedade1
    console.log(result);
    return result;
  } else if (rendimentoColectavel > LimiteSolidariedade2) {
    console.log("Taxa de Solidariedade 2");
    result = ((rendimentoColectavel - LimiteSolidariedade2) * TaxaSolidariedade2) + ImpostoMaxSolidariedade1;
    console.log(result);
    return result;
  } else {
    return 0
  }
}

// So contam os conjugues desde 2016 e chama-se agora Quociente Conjugal
function calcQuocienteFamiliar() {
  return numContribuintes
}

// Calculo imposto
function calcImposto(rendimentoColectavel) {
  var result;
  if (rendimentoColectavel <= 0) {
    console.log("Nao paga imposto");
    return 0
  }
  if (rendimentoColectavel <= Escalao1) {
    console.log("escalao1");
    result = (rendimentoColectavel * Escalao1Percent);
    console.log(result);
    return result;
  } else if (rendimentoColectavel > Escalao1 && rendimentoColectavel <= Escalao2) {
    console.log("escalao2");
    result = (((rendimentoColectavel - Escalao1) * Escalao2Percent) + Escalao1MaxImposto);
    console.log(result);
    return result;
  } else if (rendimentoColectavel > Escalao2 && rendimentoColectavel <= Escalao3) {
    console.log("escalao3");
    result = (((rendimentoColectavel - Escalao2) * Escalao3Percent) + Escalao1MaxImposto + Escalao2MaxImposto);
    return result;
  } else if (rendimentoColectavel > Escalao3 && rendimentoColectavel <= Escalao4) {
    console.log("escalao4");
    result = (((rendimentoColectavel - Escalao3) * Escalao4Percent) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto);
    return result;
  } else if (rendimentoColectavel > Escalao4 && rendimentoColectavel <= Escalao5) {
    console.log("escalao5");
    result = (((rendimentoColectavel - Escalao4) * Escalao5Percent) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto + Escalao4MaxImposto);
    return result;
  } else if (rendimentoColectavel > Escalao5 && rendimentoColectavel <= Escalao6) {
    console.log("escalao6");
    result = (((rendimentoColectavel - Escalao5) * Escalao6Percent) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto + Escalao4MaxImposto + Escalao5MaxImposto);
    return result;
  } else if (rendimentoColectavel > Escalao6) {
    console.log("escalao7");
    result = (((rendimentoColectavel - Escalao6) * Escalao7Percent) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto + Escalao4MaxImposto + Escalao5MaxImposto + Escalao6MaxImposto);
    return result;
  }
}

// Deducoes Colecta
function calcDeducoesTotal(rendColect) {
  var deducoesSaude = calcDespesasSaude(despesasSaude);
  var deducoesEducacao = calcDespesasEducacao(despesasEducacao);
  var deducoesIVA = calcDespesasIVA(despesasIVA);
  var deducoesGerais = calcDespesasGerais(despesasGerais);
  var deducoesDescendentes = calcDeducoesDependentes();
  var deducoesAscendentes = calcDeducoesAscendentes();

  var limiteDeducoes = calcLimiteDeducoes(rendColect);
  var deducoesParaLimite = deducoesSaude + deducoesEducacao + deducoesIVA;
  if(deducoesParaLimite > limiteDeducoes && limiteDeducoes > 0){
    deducoesParaLimite = limiteDeducoes;
  }
  return deducoesGerais + deducoesDescendentes + deducoesAscendentes + deducoesParaLimite;
}

function calcDespesasSaude(despesasSaude) {
  var taxaSaude = 0.15;
  var limiteSaude = 1000;
  var result = despesasSaude * taxaSaude;
  if (result < limiteSaude) {
    return result;
  } else {
    return limiteSaude;
  }
}

function calcDespesasEducacao(despesasEducacao) {
  var taxaEducacao = 0.30;
  var limiteEducacao = 800;
  var result = despesasEducacao * taxaEducacao;
  if (result < limiteEducacao) {
    return result;
  } else {
    return limiteEducacao;
  }
}

function calcDespesasGerais(despesasGerais) {
  var taxaGeral = 0.35;
  var taxaGeralMonoparental = 0.45;
  var limiteGeral = 250;
  var limiteGeralMonoparental = 335;
  var result;
  if (familiaMonoparental) {
    result = despesasGerais * taxaGeralMonoparental;
    if (result < limiteGeralMonoparental) {
      return result;
    } else {
      return limiteGeralMonoparental;
    }
  } else {
    result = despesasGerais * taxaGeral;
    if (result < (limiteGeral * numContribuintes)) {
      return result;
    } else {
      return limiteGeral * numContribuintes;
    }
  }
}

function calcDespesasIVA(despesasIVA) {
  var taxaIVA = 0.15;
  var limiteIVA = 250;
  var result = despesasIVA * taxaIVA;
  if (result < limiteIVA) {
    return result;
  } else {
    return limiteIVA;
  }
}

function calcDeducoesDependentes() {
  var deducaoTotalDependente3Anos = dependentes3Anos * DeducaoDependenteMenos3Anos;
  var deducaoTotalDependentes = dependentes * DeducaoDependenteMais3Anos;
  return deducaoTotalDependente3Anos + deducaoTotalDependentes;
}

function calcDeducoesAscendentes() {
  if (ascendentes > 1) {
    return DeducaoAscendentesMultiplos * ascendentes;
  } else {
    return DeducaoAscendenteUnico * ascendentes;
  }
}

/**
 * € 1 000 + [€ 2 500 - € 1 000) x [valor do último escalão - Rendimento Coletável]] /
 * valor do último escalão - valor do primeiro escalão;
 * So aplicavel a deducoes de Saude; Educacao; Imoveis; Pensoes de Alimentos; IVA;
 * Lares e Beneficios Fiscais
 * Para agregados familiares com mais de 3 dependendes majoracao de 5% por dependente
 */
function calcLimiteDeducoes(rendimentoColectavel){
  var limite = -1;
  if(rendimentoColectavel <= Escalao1) {
    return limite;
  } else if (rendimentoColectavel > Escalao1 && rendimentoColectavel <= Escalao6) {
    limite = 1000 + (1500 * (Escalao6 - rendimentoColectavel)) / (Escalao6 - Escalao1)
  } else {
    limite = 1000;
  }
  if(dependentes >= 3){
    limite += limite * (0.05 * dependentes);
  }
  return limite;
}

// Colecta Liquida
function calcColectaLiquida(impostoApurado, despesas) {
  return impostoApurado - despesas;
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
