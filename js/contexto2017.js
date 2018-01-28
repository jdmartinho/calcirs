var Contexto2017 = function(){};

Contexto2017.prototype = function(){
  // Valores e calculos especificos para 2017
  // Limites superiores dos escaloes IRS
  var Escalao1 = 7091;
  var Escalao2 = 20261;
  var Escalao3 = 40522;
  var Escalao4 = 80640;
  // Percentagens dos escaloes IRS
  var Escalao1Percent = 0.145;
  var Escalao2Percent = 0.285;
  var Escalao3Percent = 0.37;
  var Escalao4Percent = 0.45;
  var Escalao5Percent = 0.48;
  // Maximo imposto pago em cada escalao
  var Escalao1MaxImposto = 1028.2;
  var Escalao2MaxImposto = 3753.45;
  var Escalao3MaxImposto = 7496.57;
  var Escalao4MaxImposto = 18053.1;
  // Taxa Solidariedade
  var TaxaSolidariedade1 = 0.025;
  var TaxaSolidariedade2 = 0.05;
  var LimiteSolidariedade1 = 80000;
  var LimiteSolidariedade2 = 250000;
  var ImpostoMaxSolidariedade1 = 4250;
  // Sobretaxa
  var SobretaxaEscalao3 = 0.0088;
  var SobretaxaEscalao4 = 0.0275;
  var SobretaxaEscalao5 = 0.0321;
  var SobretaxaEscalao3Max = 178.30;
  var SobretaxaEscalao4Max = 1103.25;
  // Deducoes especificas
  var DeducaoRendDependente = 4104;
  var DeducaoRendIndependentePercent = 0.75;
  var DeducaoDependenteMenos3Anos = 725;
  var DeducaoDependenteMais3Anos = 600;
  var DeducaoAscendenteUnico = 635;
  var DeducaoAscendentesMultiplos = 525;
  // Quocientes
  var QuocienteDependente = 0.3;
  // Outros Valores
  var rendMinimoMensalGarantido2010 = 475;
  var indexanteApoioSocial = 421.32;
  var minimoExistencia = indexanteApoioSocial * 1.5 * 14;
  var limiteRendPropIntelectual = 10000;

  algoritmo = function() {
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
    var impostoApurado = calcImposto(rendColectCorrigido);
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
  },

  // Deducoes Especificas
  calcRendColectavel = function() {
    return calcRendColectavelCatA(rendimentoDependente) +
      calcRendColectavelCatB(rendimentoIndependente) +
      calcRendColectavelCatE(rendimentoCapital) +
      calcRendColectavelCatF(rendimentoPredial) +
      calcRendColectavelCatH(rendimentoPensoes);
  },

  calcRendColectavelCatA = function(rendimentoDependente) {
    if (rendimentoDependente <= DeducaoRendDependente) {
      return 0;
    } else {
      return parseFloat(rendimentoDependente) - DeducaoRendDependente;
    }
  },

  calcRendColectavelCatB = function(rendimentoIndependente) {
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
  },

  calcRendColectavelCatE = function(rendimentoCapital) {
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
  },

  calcRendColectavelCatF = function(rendimentoPredial) {
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
  },

  calcRendColectavelCatH = function(rendimentoPensoes) {
    if (rendimentoPensoes <= DeducaoRendDependente) {
      return 0;
    } else {
      return parseFloat(rendimentoPensoes) - DeducaoRendDependente;
    }
  },

  // Taxa de Solidariedade
  calcTaxaSolidariedadeDevida = function(rendimentoColectavel) {
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
  },

  // So contam os conjugues desde 2016 e chama-se agora Quociente Conjugal
  calcQuocienteFamiliar = function() {
    return numContribuintes
  },

  // Calculo imposto
  calcImposto = function(rendimentoColectavel) {
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
      result = (((rendimentoColectavel - Escalao2) * (Escalao3Percent + SobretaxaEscalao3)) + Escalao1MaxImposto + Escalao2MaxImposto);
      return result;
    } else if (rendimentoColectavel > Escalao3 && rendimentoColectavel <= Escalao4) {
      console.log("escalao4");
      result = (((rendimentoColectavel - Escalao3) * (Escalao4Percent + SobretaxaEscalao4)) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto + SobretaxaEscalao3Max);
      return result;
    } else if (rendimentoColectavel > Escalao4) {
      console.log("escalao5");
      result = (((rendimentoColectavel - Escalao4) * (Escalao5Percent + SobretaxaEscalao5)) + Escalao1MaxImposto + Escalao2MaxImposto + Escalao3MaxImposto + Escalao4MaxImposto + SobretaxaEscalao3Max + SobretaxaEscalao4Max);
      return result;
    }
  },

  // Deducoes Colecta
  calcDeducoesTotal = function(rendColect) {
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
  },

  calcDespesasSaude = function(despesasSaude) {
    var taxaSaude = 0.15;
    var limiteSaude = 1000;
    var result = despesasSaude * taxaSaude;
    if (result < limiteSaude) {
      return result;
    } else {
      return limiteSaude;
    }
  },

  calcDespesasEducacao = function(despesasEducacao) {
    var taxaEducacao = 0.30;
    var limiteEducacao = 800;
    var result = despesasEducacao * taxaEducacao;
    if (result < limiteEducacao) {
      return result;
    } else {
      return limiteEducacao;
    }
  },

  calcDespesasGerais = function(despesasGerais) {
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
  },

  calcDespesasIVA = function(despesasIVA) {
    var taxaIVA = 0.15;
    var limiteIVA = 250;
    var result = despesasIVA * taxaIVA;
    if (result < limiteIVA) {
      return result;
    } else {
      return limiteIVA;
    }
  },

  calcDeducoesDependentes = function() {
    var deducaoTotalDependente3Anos = dependentes3Anos * DeducaoDependenteMenos3Anos;
    var deducaoTotalDependentes = dependentes * DeducaoDependenteMais3Anos;
    return deducaoTotalDependente3Anos + deducaoTotalDependentes;
  },

  calcDeducoesAscendentes = function() {
    if (ascendentes > 1) {
      return DeducaoAscendentesMultiplos * ascendentes;
    } else {
      return DeducaoAscendenteUnico * ascendentes;
    }
  },

  /**
   * € 1 000 + [€ 2 500 - € 1 000) x [valor do último escalão - Rendimento Coletável]] /
   * valor do último escalão - valor do primeiro escalão;
   * So aplicavel a deducoes de Saude; Educacao; Imoveis; Pensoes de Alimentos; IVA;
   * Lares e Beneficios Fiscais
   * Para agregados familiares com mais de 3 dependendes majoracao de 5% por dependente
   */
  calcLimiteDeducoes = function(rendimentoColectavel){
    var limite = -1;
    if(rendimentoColectavel <= Escalao1) {
      return limite;
    } else if (rendimentoColectavel > Escalao1 && rendimentoColectavel <= Escalao4) {
      limite = 1000 + (1500 * (Escalao4 - rendimentoColectavel)) / (Escalao4 - Escalao1)
    } else {
      limite = 1000;
    }
    if(dependentes >= 3){
      limite += limite * (0.05 * dependentes);
    }
    return limite;
  },

  // Colecta Liquida
  calcColectaLiquida = function(impostoApurado, despesas) {
    return impostoApurado - despesas;
  };

  return {
    algoritmo : algoritmo
  };
}();
