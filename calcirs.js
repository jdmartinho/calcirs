// Constantes
// Limites superiores dos escaloes IRS
const escalao1 = 7091;
const escalao2 = 10700;
const escalao3 = 20261;
const escalao4 = 25000;
const escalao5 = 36856;
const escalao6 = 80640;
// Percentagens dos escaloes IRS
const escalao1Percent = 0.145;
const escalao2Percent = 0.23;
const escalao3Percent = 0.285;
const escalao4Percent = 0.35;
const escalao5Percent = 0.37;
const escalao6Percent = 0.45;
const escalao7Percent = 0.48;
// Maximo imposto pago em cada escalao
const escalao1MaxImposto = 1028.2;
const escalao2MaxImposto = 830.07;
const escalao3MaxImposto = 2724.89;
const escalao4MaxImposto = 1658.65;
const escalao5MaxImposto = 4386.72;
const escalao6MaxImposto = 19702.8;
// Outros impostos
const impostoCapital = 0.28;
// Taxa Solidariedade
const taxaSolidariedade1 = 0.025;
const taxaSolidariedade2 = 0.05;
const limiteSolidariedade1 = 80000;
const limiteSolidariedade2 = 250000;
const impostoMaximoSolidariedade1 = 4250;
// Deducoes especificas
const deducaoRendimentoDependente = 4104;
const deducaoRendimentoIndependentePercent = 0.75;
const deducaoDependente3Anos = 725;
const deducaoDependente = 600;
const deducaoAscendenteUnico = 635;
const deducaoAscendenteMultiplos = 525;
// Quocientes
const quocienteDependente = 0.3;

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

function algoritmo(rendimentoTotal){
  // Calcular Deducoes Especificas
  var dedEspecificas = calcDeducoesEspecificas();
  // Subtrair as deducoes especificas ao rendimento total para calcular o rendimento colectavel
  var rendColect = rendimentoTotal - dedEspecificas;
  // Apurar Taxa de Solidariedade devida
  var impostoSolidariedadeDevido = calcTaxaSolidariedadeDevida(rendColect);
  // Calcular o quociente familiar
  var quocienteFamiliar = calcQuocienteFamiliar();
  // Dividir o rendimento colectal pelo quociente familiar para calcular o rendimento colectavel corrigido
  var rendColectCorrigido = rendColect / quocienteFamiliar;
  // Calcular o imposto devido do rendimento colectavel corrigido
  var impostoApurado = calcImposto(rendColectCorrigido);
  // Multiplicar o imposto pelo quociente familiar para apurar a colecta total
  var colectaTotal = impostoApurado * quocienteFamiliar;
  // Adicionar imposto de Solidariedade a colecta total
  var colectaApuradaTotal = colectaTotal + impostoSolidariedadeDevido;
  // Calcular deducoes a colecta
  var deducoesColecta = calcDeducoesTotal();
  // Subtrair deducoes a colecta da colecta total para calcular o imposto devido
  var impostoFinal = calcColectaLiquida();
  return impostoFinal
}

// Deducoes Especificas

function calcRendColectavelCatA(rendimentoDependente){
  if(rendimentoDependente <= deducaoRendimentoDependente) {
    return 0;
  } else {
    return rendimentoDependente - deducaoRendimentoDependente;
  }
}

function calcRendColectavelCatB(rendimentoIndependente) {
  return rendimentoIndependente * deducaoRendimentoIndependentePercent;
}

function calcRendColectavel(rendimentoDependente, rendimentoIndependente) {
  return calcRendColectavelCatA(rendimentoDependente) +
    calcRendColectavelCatB(rendimentoIndependente);
}

// Quociente Familiar

function quocienteFamiliar(){
  return numContribuintes + (dependentes3Anos + dependentes + ascendentes) * quocienteDependente
}

// Calculo imposto

function calcImposto(rendimentoColectavel) {
  var result;
  if(rendimentoColectavel <= 0){
    console.log("Nao paga imposto");
    return 0
  }
  if(rendimentoColectavel <= escalao1) {
    console.log("escalao1");
    result = (rendimentoColectavel * escalao1Percent);
    console.log(result);
    return result;
  } else if(rendimentoColectavel > escalao1 && rendimentoColectavel <= escalao2) {
    console.log("escalao2");
    result = (((rendimentoColectavel - escalao1) * escalao2Percent) + escalao1MaxImposto);
    console.log(result);
    return result;
  } else if(rendimentoColectavel > escalao2 && rendimentoColectavel <= escalao3) {
    console.log("escalao3");
    result = (((rendimentoColectavel - escalao2) * escalao3Percent) + escalao1MaxImposto + escalao2MaxImposto);
    return result;
  } else if(rendimentoColectavel > escalao3 && rendimentoColectavel <= escalao4) {
    console.log("escalao4");
    result = (((rendimentoColectavel - escalao3) * escalao4Percent) + escalao1MaxImposto + escalao2MaxImposto + escalao3MaxImposto);
    return result;
  } else if(rendimentoColectavel > escalao4 && rendimentoColectavel <= escalao5) {
    console.log("escalao5");
    result = (((rendimentoColectavel - escalao4) * escalao5Percent) + escalao1MaxImposto + escalao2MaxImposto + escalao3MaxImposto + escalao4MaxImposto);
    return result;
  } else if(rendimentoColectavel > escalao5 && rendimentoColectavel <= escalao6) {
    console.log("escalao6");
    result = (((rendimentoColectavel - escalao5) * escalao6Percent) + escalao1MaxImposto + escalao2MaxImposto + escalao3MaxImposto + escalao4MaxImposto + escalao5MaxImposto);
    return result;
  } else if(rendimentoColectavel > escalao6) {
    console.log("escalao7");
    result = (((rendimentoColectavel - escalao6) * escalao7Percent) + escalao1MaxImposto + escalao2MaxImposto + escalao3MaxImposto + escalao4MaxImposto + escalao5MaxImposto + escalao6MaxImposto);
    return result;
  }
}

// Taxa de Solidariedade
function calcTaxaSolidariedadeDevida(rendimentoColectavel){
  var result;
  if(rendimentoColectavel > limiteSolidariedade1 && rendimentoColectavel <= limiteSolidariedade2){
    console.log("Taxa de Solidariedade 1")
    result = rendimentoColectavel * taxaSolidariedade1
    console.log(result);
    return result;
  } else if(rendimentoColectavel > limiteSolidariedade2){
    console.log("Taxa de Solidariedade 2");
    result = ((rendimentoColectavel - limiteSolidariedade2) * taxaSolidariedade2) + impostoMaximoSolidariedade1;
    console.log(result);
    return result;
  } else {
    return 0
  }
}

// Deducoes Colecta

function calcDespesasSaude(despesasSaude){
  var taxaSaude = 0.15;
  var limiteSaude = 1000;
  var result = despesasSaude * taxaSaude;
  if(result < limiteSaude) {
    return result;
  } else {
    return limiteSaude;
  }
}

function calcDespesasEducacao(despesasEducacao){
  var taxaEducacao = 0.30;
  var limiteEducacao = 800;
  var result = despesasEducacao * taxaEducacao;
  if(result < limiteEducacao) {
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
  if(familiaMonoparental){
    result = despesasGerais * taxaGeralMonoparental;
    if(result < limiteGeralMonoparental){
      return result;
    } else {
      return limiteGeralMonoparental;
    }
  } else {
    result = despesasGerais * taxaGeral;
    if(result < limiteGeral){
      return result;
    } else {
      return limiteGeral;
    }
  }
}

function calcDespesasIVA(despesasIVA) {
  var taxaIVA = 0.15;
  var limiteIVA = 250;
  var result = despesasIVA * taxaIVA;
  if(result < limiteIVA){
    return result;
  } else {
    return limiteIVA;
  }
}

function calcDeducoesDependentes(){
  var deducaoTotalDependente3Anos = dependentes3Anos * deducaoDependente3Anos;
  var deducaoTotalDependentes = dependentes * deducaoDependente;
  return deducaoTotalDependente3Anos + deducaoTotalDependentes;
}

function calcDeducoesAscendentes(){
  if(ascendentes > 1){
    return deducaoAscendenteMultiplos * ascendentes;
  } else {
    return deducaoAscendenteUnico * ascendentes;
  }
}

function calcDeducoesTotal(despesasSaude, despesasEducacao, despesasGerais, despesasIVA){
  return calcDespesasSaude(despesasSaude) + calcDespesasEducacao(despesasEducacao) +
    calcDespesasGerais(despesasGerais) + calcDespesasIVA(despesasIVA) +
    calcDeducoesDependentes() + calcDeducoesAscendentes();
}

function calcColectaLiquida(impostoApurado, despesas){
  return impostoApurado - despesas;
}
