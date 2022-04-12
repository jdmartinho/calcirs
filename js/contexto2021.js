var Contexto2021 = function () {};

Contexto2021.prototype = (function () {
  // Constantes
  // Limites superiores dos escaloes IRS
  var Escalao1 = 7112;
  var Escalao2 = 10732;
  var Escalao3 = 20322;
  var Escalao4 = 25075;
  var Escalao5 = 36967;
  var Escalao6 = 80882;
  // Percentagens dos escaloes IRS
  var Escalao1Percent = 0.145;
  var Escalao2Percent = 0.23;
  var Escalao3Percent = 0.285;
  var Escalao4Percent = 0.35;
  var Escalao5Percent = 0.37;
  var Escalao6Percent = 0.45;
  var Escalao7Percent = 0.48;
  // Maximo imposto pago em cada escalao
  var Escalao1MaxImposto = 1031.24;
  var Escalao2MaxImposto = 832.6;
  var Escalao3MaxImposto = 2733.15;
  var Escalao4MaxImposto = 1663.55;
  var Escalao5MaxImposto = 4400.04;
  var Escalao6MaxImposto = 19761.75;
  // Outros impostos
  var ImpostoCapital = 0.28;
  var taxaResidenteNaoHabitual = 0.2;
  // Taxa Solidariedade
  var TaxaSolidariedade1 = 0.025;
  var TaxaSolidariedade2 = 0.05;
  var LimiteSolidariedade1 = 80000;
  var LimiteSolidariedade2 = 250000;
  var ImpostoMaxSolidariedade1 = 4250;
  // Deducoes especificas
  var DeducaoRendDependente = 4104;
  var DeducaoRendIndependentePercent = 0.75;
  var DespesasCatBPercent = 0.15;
  var DeducaoDependenteMenos3Anos = 726;
  var DeducaoDependenteMais3Anos = 600;
  var DeducaoAscendenteUnico = 635;
  var DeducaoAscendentesMultiplos = 525;
  // Outros Valores
  var rendMinimoMensalGarantido2010 = 475;
  var indexanteApoioSocial = 438.81;
  var minimoExistencia = indexanteApoioSocial * 1.5 * 14;
  var minimoExistenciaCom3Ou4Dependentes = 11320;
  var minimoExistenciaCom5OuMaisDependendtes = 15560;
  var limiteRendPropIntelectual = 10000;
  var rendMinimoAnualGarantido = 8120;
  var rendMinimoMensalGarantido = 580;
  // Algoritmo para rendimento em 2021
  var algoritmo = function () {
      var rendimentoTotal =
        parseFloat(rendimentoDependente) +
        parseFloat(rendimentoIndependente) +
        parseFloat(rendimentoCapital) +
        parseFloat(rendimentoPredial) +
        parseFloat(rendimentoPensoes);
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
      var impostoFinal = calcColectaLiquida(
        colectaApuradaTotal,
        deducoesColecta
      );
      console.log("Imposto Final: " + impostoFinal);
      if (impostoFinal < 0) {
        impostoFinal = 0;
      }
      // Minimo de Existencia
      if (rendimentoCapital == 0 && rendimentoPredial == 0) {
        var numDependentes = dependentes + dependentes3Anos;
        if (numDependentes < 3) {
          // Aplica-se o minimo de existencia ao rendimento liquido
          var rendLiquidoDeImposto = rendimentoTotal - impostoFinal;
          if (rendLiquidoDeImposto < minimoExistencia) {
            impostoFinal = rendimentoTotal - minimoExistencia;
            if (impostoFinal < 0) {
              impostoFinal = 0;
            }
          }
        } else {
          // Aplica-se minimos de existencia ao rendimento colectavel
          if (numDependentes < 5) {
            if (rendColect < minimoExistenciaCom3Ou4Dependentes) {
              impostoFinal = 0;
            }
          } else if (rendColect < minimoExistenciaCom5OuMaisDependendtes) {
            impostoFinal = 0;
          }
        }
      }
      console.log("Imposto Final apos Minimo de Existencia: " + impostoFinal);
      // Resultados
      $("#impostoAPagar").val(impostoFinal.formatMoney(2) + " €");
      $("#taxaEfectiva").val(
        ((impostoFinal / rendimentoTotal) * 100).toFixed(2) + " %"
      );
      $("#totalLiquido").val(
        (rendimentoTotal - impostoFinal).formatMoney(2) + " €"
      );
      return impostoFinal;
    },
    // Deducoes Especificas
    calcRendColectavel = function () {
      return (
        calcRendColectavelCatA(rendimentoDependente) +
        calcRendColectavelCatB(rendimentoIndependente) +
        calcRendColectavelCatE(rendimentoCapital) +
        calcRendColectavelCatF(rendimentoPredial) +
        calcRendColectavelCatH(rendimentoPensoes)
      );
    },
    calcRendColectavelCatA = function (rendimentoDependente) {
      if (rendimentoDependente <= DeducaoRendDependente) {
        return 0;
      } else {
        return parseFloat(rendimentoDependente) - DeducaoRendDependente;
      }
    },
    calcRendColectavelCatB = function (rendimentoIndependente) {
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
        var valorASomarARendimentoTributavel = result * DespesasCatBPercent;
        var valorDeducaoTotal =
          DeducaoRendDependente + parseFloat(valorDespesasCatB);
        var abatimentoADeducao =
          valorASomarARendimentoTributavel - valorDeducaoTotal;
        if (abatimentoADeducao < 0) {
          abatimentoADeducao = 0;
        }
        return result * DeducaoRendIndependentePercent + abatimentoADeducao;
      }
    },
    calcRendColectavelCatE = function (rendimentoCapital) {
      perdasCapitais = 0;
      if (rendimentoCapital <= 0) {
        return 0;
      } else {
        var result = parseFloat(rendimentoCapital) - parseFloat(perdasCapitais);
        if (result < 0) {
          return 0;
        } else {
          return result;
        }
      }
    },
    calcRendColectavelCatF = function (rendimentoPredial) {
      if (rendimentoPredial <= 0) {
        return 0;
      } else {
        var result =
          rendimentoPredial - condominios - obras - impostoMunicipalImoveis;
        if (result <= 0) {
          return 0;
        } else {
          return result;
        }
      }
    },
    calcRendColectavelCatH = function (rendimentoPensoes) {
      if (rendimentoPensoes <= DeducaoRendDependente) {
        return 0;
      } else {
        return parseFloat(rendimentoPensoes) - DeducaoRendDependente;
      }
    },
    // Taxa de Solidariedade
    calcTaxaSolidariedadeDevida = function (rendimentoColectavel) {
      var result;
      if (
        rendimentoColectavel > LimiteSolidariedade1 &&
        rendimentoColectavel <= LimiteSolidariedade2
      ) {
        console.log("Taxa de Solidariedade 1");
        result =
          (rendimentoColectavel - LimiteSolidariedade1) * TaxaSolidariedade1;
        console.log(result);
        return result;
      } else if (rendimentoColectavel > LimiteSolidariedade2) {
        console.log("Taxa de Solidariedade 2");
        result =
          (rendimentoColectavel - LimiteSolidariedade2) * TaxaSolidariedade2 +
          ImpostoMaxSolidariedade1;
        console.log(result);
        return result;
      } else {
        return 0;
      }
    },
    // So contam os conjugues desde 2016 e chama-se agora Quociente Conjugal
    calcQuocienteFamiliar = function () {
      return numContribuintes;
    },
    // Calculo imposto
    calcImposto = function (rendimentoColectavel) {
      var result;
      if (rendimentoColectavel <= 0) {
        console.log("Nao paga imposto");
        return 0;
      }
      if (rendimentoColectavel <= Escalao1) {
        console.log("escalao1");
        result = rendimentoColectavel * Escalao1Percent;
        console.log(result);
        return result;
      } else if (
        rendimentoColectavel > Escalao1 &&
        rendimentoColectavel <= Escalao2
      ) {
        console.log("escalao2");
        result =
          (rendimentoColectavel - Escalao1) * Escalao2Percent +
          Escalao1MaxImposto;
        console.log(result);
        return result;
      } else if (
        rendimentoColectavel > Escalao2 &&
        rendimentoColectavel <= Escalao3
      ) {
        console.log("escalao3");
        result =
          (rendimentoColectavel - Escalao2) * Escalao3Percent +
          Escalao1MaxImposto +
          Escalao2MaxImposto;
        return result;
      } else if (
        rendimentoColectavel > Escalao3 &&
        rendimentoColectavel <= Escalao4
      ) {
        console.log("escalao4");
        result =
          (rendimentoColectavel - Escalao3) * Escalao4Percent +
          Escalao1MaxImposto +
          Escalao2MaxImposto +
          Escalao3MaxImposto;
        return result;
      } else if (
        rendimentoColectavel > Escalao4 &&
        rendimentoColectavel <= Escalao5
      ) {
        console.log("escalao5");
        result =
          (rendimentoColectavel - Escalao4) * Escalao5Percent +
          Escalao1MaxImposto +
          Escalao2MaxImposto +
          Escalao3MaxImposto +
          Escalao4MaxImposto;
        return result;
      } else if (
        rendimentoColectavel > Escalao5 &&
        rendimentoColectavel <= Escalao6
      ) {
        console.log("escalao6");
        result =
          (rendimentoColectavel - Escalao5) * Escalao6Percent +
          Escalao1MaxImposto +
          Escalao2MaxImposto +
          Escalao3MaxImposto +
          Escalao4MaxImposto +
          Escalao5MaxImposto;
        return result;
      } else if (rendimentoColectavel > Escalao6) {
        console.log("escalao7");
        result =
          (rendimentoColectavel - Escalao6) * Escalao7Percent +
          Escalao1MaxImposto +
          Escalao2MaxImposto +
          Escalao3MaxImposto +
          Escalao4MaxImposto +
          Escalao5MaxImposto +
          Escalao6MaxImposto;
        return result;
      }
    },
    // Deducoes Colecta
    calcDeducoesTotal = function (rendColect) {
      var deducoesSaude = calcDespesasSaude(despesasSaude);
      var deducoesEducacao = calcDespesasEducacao(despesasEducacao);
      var deducoesIVA = calcDespesasIVA(despesasIVA);
      var deducoesGerais = calcDespesasGerais(despesasGerais);
      var deducoesDescendentes = calcDeducoesDependentes();
      var deducoesAscendentes = calcDeducoesAscendentes();

      var limiteDeducoes = calcLimiteDeducoes(rendColect);
      var deducoesParaLimite = deducoesSaude + deducoesEducacao + deducoesIVA;
      if (deducoesParaLimite > limiteDeducoes && limiteDeducoes > 0) {
        deducoesParaLimite = limiteDeducoes;
      }
      return (
        deducoesGerais +
        deducoesDescendentes +
        deducoesAscendentes +
        deducoesParaLimite
      );
    },
    calcDespesasSaude = function (despesasSaude) {
      var taxaSaude = 0.15;
      var limiteSaude = 1000;
      var result = despesasSaude * taxaSaude;
      if (result < limiteSaude) {
        return result;
      } else {
        return limiteSaude;
      }
    },
    calcDespesasEducacao = function (despesasEducacao) {
      var taxaEducacao = 0.3;
      var limiteEducacao = 800;
      var result = despesasEducacao * taxaEducacao;
      if (result < limiteEducacao) {
        return result;
      } else {
        return limiteEducacao;
      }
    },
    calcDespesasGerais = function (despesasGerais) {
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
        if (result < limiteGeral * numContribuintes) {
          return result;
        } else {
          return limiteGeral * numContribuintes;
        }
      }
    },
    calcDespesasIVA = function (despesasIVA) {
      var taxaIVA = 0.15;
      var limiteIVA = 250;
      var result = despesasIVA * taxaIVA;
      if (result < limiteIVA) {
        return result;
      } else {
        return limiteIVA;
      }
    },
    calcDeducoesDependentes = function () {
      var deducaoTotalDependente3Anos =
        dependentes3Anos * DeducaoDependenteMenos3Anos;
      var deducaoTotalDependentes = dependentes * DeducaoDependenteMais3Anos;
      return deducaoTotalDependente3Anos + deducaoTotalDependentes;
    },
    calcDeducoesAscendentes = function () {
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
    calcLimiteDeducoes = function (rendimentoColectavel) {
      var limite = -1;
      if (rendimentoColectavel <= Escalao1) {
        return limite;
      } else if (
        rendimentoColectavel > Escalao1 &&
        rendimentoColectavel <= Escalao6
      ) {
        limite =
          1000 +
          (1500 * (Escalao6 - rendimentoColectavel)) / (Escalao6 - Escalao1);
      } else {
        limite = 1000;
      }
      if (dependentes >= 3) {
        limite += limite * (0.05 * dependentes);
      }
      return limite;
    },
    // Colecta Liquida
    calcColectaLiquida = function (impostoApurado, despesas) {
      return impostoApurado - despesas;
    };

  return {
    algoritmo: algoritmo,
  };
})();
