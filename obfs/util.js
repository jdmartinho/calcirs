Number.prototype.formatMoney=function(k){var h=this,k=isNaN(k=Math.abs(k))?2:k,g=",",e=".",f=h<0?"-":"",b=String(parseInt(h=Math.abs(Number(h)||0).toFixed(k))),a=(a=b.length)>3?a%3:0;return f+(a?b.substr(0,a)+e:"")+b.substr(a).replace(/(\d{3})(?=\d)/g,"$1"+e)+(k?g+Math.abs(h-b).toFixed(k).slice(2):"")};$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip()});document.addEventListener("DOMContentLoaded",function(c){var a="http://calcirs.pt";var b="CalcIRS - Calcule o seu IRS online";$("#share-fb").attr("data-url",a).attr("data-sharer","facebook");$("#share-tw").attr("data-url",a).attr("data-title",b).attr("data-sharer","twitter");$("#share-wa").attr("data-url",a).attr("data-title",b);$("#share-li").attr("data-url",a).attr("data-sharer","linkedin");$("#share-gp").attr("data-url",a).attr("data-title",b).attr("data-sharer","googleplus");$("#share-em").attr("data-url",a).attr("data-title",b).attr("data-subject",b).attr("data-sharer","email");$(".sharer button").click(function(){c.preventDefault()})});