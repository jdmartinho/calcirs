Number.prototype.formatMoney = function(c) {
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = ",",
    t = ".",
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

document.addEventListener("DOMContentLoaded", function(event) {
  // Uses sharer.js
  // https://ellisonleao.github.io/sharer.js/#twitter
  var url = "http://calcirs.pt";
  var subject = "CalcIRS - Calcule o seu IRS online";  

  // Facebook
  $('#share-fb').attr('data-url', url).attr('data-sharer', 'facebook');
  // Twitter
  $('#share-tw').attr('data-url', url).attr('data-title', subject).attr('data-sharer', 'twitter');
  // WhatsApp
  $('#share-wa').attr('data-url', url).attr('data-title', subject);
  // Linkedin
  $('#share-li').attr('data-url', url).attr('data-sharer', 'linkedin');
  // Google plus
  $('#share-gp').attr('data-url', url).attr('data-title', subject).attr('data-sharer', 'googleplus');
  // Email
  $('#share-em').attr('data-url', url).attr('data-title', subject).attr('data-subject', subject).attr('data-sharer', 'email');

  // Prevent basic click behavior
  $(".sharer button").click(function() {
    event.preventDefault();
  });
});
