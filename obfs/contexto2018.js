var Contexto2018=function(){};Contexto2018.prototype=function(){var V=7091;var U=10700;var R=20261;var Q=25000;var P=36856;var O=80640;var k=0.145;var o=0.23;var q=0.285;var x=0.35;var H=0.37;var N=0.45;var X=0.48;var b=1028.2;var J=830.07;var ad=2724.89;var s=1658.65;var ab=4386.72;var n=19702.8;var ae=0.28;var M=0.2;var j=0.025;var i=0.05;var h=80000;var e=250000;var d=4250;var m=4104;var w=0.75;var r=22500;var z=0.8;var K=726;var F=600;var I=635;var Z=525;var t=475;var D=421.32;var W=D*1.5*14;var g=10000;var f=function(){var ah=parseFloat(rendimentoDependente)+parseFloat(rendimentoIndependente)+parseFloat(rendimentoCapital)+parseFloat(rendimentoPredial)+parseFloat(rendimentoPensoes);console.log("Rendimento Total: "+ah);var af=a();console.log("Rendimento Colectavel: "+af);var an=p(af);console.log("Imposto Solidariedade: "+an);var ag=L();console.log("Quociente Familiar: "+ag);var ai=af/ag;console.log("Rendimento Colectavel Corrigido: "+ai);var ak=l(ai);console.log("Imposto Apurado: "+ak);var ao=ak*ag;console.log("Colecta Total: "+ao);var aj=ao+an;console.log("Colecta Apurada Total: "+aj);var al=B(af);console.log("Deducoes a Colecta: "+al);var am=u(aj,al);console.log("Imposto Final: "+am);if(am<0){am=0}$("#impostoAPagar").val(am.formatMoney(2)+" €");$("#taxaEfectiva").val(((am/ah)*100).toFixed(2)+" %");$("#totalLiquido").val((ah-am).formatMoney(2)+" €");return am},a=function(){return G(rendimentoDependente)+E(rendimentoIndependente)+C(rendimentoCapital)+A(rendimentoPredial)+y(rendimentoPensoes)},G=function(af){if(af<=m){return 0}else{return parseFloat(af)-m}},E=function(ah){if(ah<=0){return 0}else{af=parseFloat(ah);if(propriedadeIntelectual){var af=0;var ag=ah*0.5;if(ag>g){ag=g}af=parseFloat(ah)-ag}return af*w}},C=function(ag){perdasCapitais=0;if(ag<=0){return 0}else{var af=parseFloat(ag)-parseFloat(perdasCapitais);if(af<0){return 0}else{return af}}},A=function(ag){if(ag<=0){return 0}else{var af=ag-condominios-obras-impostoMunicipalImoveis;if(af<=0){return 0}else{return af}}},y=function(af){if(af<=m){return 0}else{return parseFloat(af)-m}},p=function(ag){var af;if(ag>h&&ag<=e){console.log("Taxa de Solidariedade 1");af=(ag-h)*j;console.log(af);return af}else{if(ag>e){console.log("Taxa de Solidariedade 2");af=((ag-e)*i)+d;console.log(af);return af}else{return 0}}},L=function(){return numContribuintes},l=function(ag){var af;if(ag<=0){console.log("Nao paga imposto");return 0}if(ag<=V){console.log("escalao1");af=(ag*k);console.log(af);return af}else{if(ag>V&&ag<=U){console.log("escalao2");af=(((ag-V)*o)+b);console.log(af);return af}else{if(ag>U&&ag<=R){console.log("escalao3");af=(((ag-U)*q)+b+J);return af}else{if(ag>R&&ag<=Q){console.log("escalao4");af=(((ag-R)*x)+b+J+ad);return af}else{if(ag>Q&&ag<=P){console.log("escalao5");af=(((ag-Q)*H)+b+J+ad+s);return af}else{if(ag>P&&ag<=O){console.log("escalao6");af=(((ag-P)*N)+b+J+ad+s+ab);return af}else{if(ag>O){console.log("escalao7");af=(((ag-O)*X)+b+J+ad+s+ab+n);return af}}}}}}}},B=function(ag){var ah=T(despesasSaude);var aj=c(despesasEducacao);var al=ac(despesasIVA);var ai=v(despesasGerais);var ak=S();var am=Y();var an=aa(ag);var af=ah+aj+al;if(af>an&&an>0){af=an}return ai+ak+am+af},T=function(ah){var ai=0.15;var ag=1000;var af=ah*ai;if(af<ag){return af}else{return ag}},c=function(ai){var ah=0.3;var ag=800;var af=ai*ah;if(af<ag){return af}else{return ag}},v=function(ag){var ai=0.35;var ah=0.45;var aj=250;var ak=335;var af;if(familiaMonoparental){af=ag*ah;if(af<ak){return af}else{return ak}}else{af=ag*ai;if(af<(aj*numContribuintes)){return af}else{return aj*numContribuintes}}},ac=function(ah){var ai=0.15;var ag=250;var af=ah*ai;if(af<ag){return af}else{return ag}},S=function(){var ag=dependentes3Anos*K;var af=dependentes*F;return ag+af},Y=function(){if(ascendentes>1){return Z*ascendentes}else{return I*ascendentes}},aa=function(ag){var af=-1;if(ag<=V){return af}else{if(ag>V&&ag<=O){af=1000+(1500*(O-ag))/(O-V)}else{af=1000}}if(dependentes>=3){af+=af*(0.05*dependentes)}return af},u=function(ag,af){return ag-af};return{algoritmo:f}}();