// Valores e calculos especificos para 2017
// Constantes
// Limites superiores dos escaloes IRS
const Escalao1_2017 = 7091;
const Escalao2_2017 = 20261;
const Escalao3_2017 = 40522;
const Escalao4_2017 = 80640;
// Percentagens dos escaloes IRS
const Escalao1Percent_2017 = 0.145;
const Escalao2Percent_2017 = 0.285;
const Escalao3Percent_2017 = 0.37;
const Escalao4Percent_2017 = 0.45;
const Escalao5Percent_2017 = 0.48;
// Maximo imposto pago em cada escalao
const Escalao1MaxImposto_2017 = 1028.2;
const Escalao2MaxImposto_2017 = 3753.45;
const Escalao3MaxImposto2017 = 7496.57;
const Escalao4MaxImposto_2017 = 18053.1;
// Taxa Solidariedade
const TaxaSolidariedade1_2017 = 0.025;
const TaxaSolidariedade2_2017 = 0.05;
const LimiteSolidariedade1_2017 = 80000;
const LimiteSolidariedade2_2017 = 250000;
const ImpostoMaxSolidariedade1_2017 = 4250;
// Sobretaxa
const SobretaxaEscalao3_2017 = 0.0088;
const SobretaxaEscalao4_2017 = 0.0275;
const SobretaxaEscalao5_2017 = 0.0321;
const SobretaxaEscalao3Max_2017 = 178.30;
const SobretaxaEscalao4Max_2017 = 1103.25;

// Calculo imposto
function calcImposto17(rendimentoColectavel) {
  var result;
  if (rendimentoColectavel <= 0) {
    console.log("Nao paga imposto");
    return 0
  }
  if (rendimentoColectavel <= Escalao1_2017) {
    console.log("escalao1");
    result = (rendimentoColectavel * Escalao1Percent_2017);
    console.log(result);
    return result;
  } else if (rendimentoColectavel > Escalao1_2017 && rendimentoColectavel <= Escalao2_2017) {
    console.log("escalao2");
    result = (((rendimentoColectavel - Escalao1_2017) * Escalao2Percent_2017) + Escalao1MaxImposto_2017);
    console.log(result);
    return result;
  } else if (rendimentoColectavel > Escalao2_2017 && rendimentoColectavel <= Escalao3_2017) {
    console.log("escalao3");
    result = (((rendimentoColectavel - Escalao2_2017) * (Escalao3Percent_2017 + SobretaxaEscalao3_2017)) + Escalao1MaxImposto_2017 + Escalao2MaxImposto_2017);
    return result;
  } else if (rendimentoColectavel > Escalao3_2017 && rendimentoColectavel <= Escalao4_2017) {
    console.log("escalao4");
    result = (((rendimentoColectavel - Escalao3_2017) * (Escalao4Percent_2017 + SobretaxaEscalao4_2017)) + Escalao1MaxImposto_2017 + Escalao2MaxImposto_2017 + Escalao3MaxImposto2017 + SobretaxaEscalao3Max_2017);
    return result;
  } else if (rendimentoColectavel > Escalao4_2017) {
    console.log("escalao5");
    result = (((rendimentoColectavel - Escalao4_2017) * (Escalao5Percent_2017 + SobretaxaEscalao5_2017)) + Escalao1MaxImposto_2017 + Escalao2MaxImposto_2017 + Escalao3MaxImposto2017 + Escalao4MaxImposto_2017 + SobretaxaEscalao3Max_2017 + SobretaxaEscalao4Max_2017);
    return result;
  }
}
