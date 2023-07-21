// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// CHANGE COLOR

document.addEventListener('DOMContentLoaded', function() {
  setInterval(() => {
    fetch('/api/check_transaction')
    .then(response => response.json())
    .then((transaction) => {
      if (transaction["response"] === "ok") {
        $("#timer").css("-webkit-text-fill-color", "#03C03C");
        $("#alert-container").css("border-color", "#03C03C");
        $("#address-container").css("border-color", "#03C03C");
        $("#id-container").css("border-color", "#03C03C");
        $("#code-container").css("border-color", "#03C03C");
        $("#link-container").css("border-color", "#03C03C");
        $("#next-step").css("display", "initial");
        $("#total-amount").css("display", "initial");
        $("#amount").css("display", "initial");
        $(".qr-code-container").css("display", "none");

        $("span").css("-webkit-text-fill-color", "#03C03C");
        $("label").css("-webkit-text-fill-color", "#03C03C");
        $("p").css("-webkit-text-fill-color", "#03C03C");
        $("button").css("background-color", "#03C03C");

        $("#alert-image").attr("src", "https://images-ext-2.discordapp.net/external/AqLqYRZ-pEK5EPTecY4FmzjKhcEAE9FhvoyQ4tOLgQ8/https/res.cloudinary.com/dkfzwchma/image/upload/v1689100726/exclamation_f6qesg.png");
      }
    })
  }, 1000);
});

// TIMER

let startTime;
// Vérifie si le timer existe enregistré dans le sessionStorage
if (sessionStorage.getItem('timer')) {
    // Récupère la valeur du timer enregistrée dans le sessionStorage
    startTime = parseInt(sessionStorage.getItem('timer'));
} else {
    // Si le timer n'existe pas, initialise la valeur de départ à 24 heures
    startTime = 24 * 60 * 60;
}

// Met à jour le timer toutes les secondes
var timerInterval = setInterval(function() {
    // Vérifier si le temps restant est écoulé
    if (startTime <= 0) {
        // Arrêter l'intervalle et afficher "Temps écoulé"
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "Temps écoulé";
        return;
    }

    // Convertir le temps restant en heures, minutes et secondes
    var hours = Math.floor(startTime / 3600);
    var minutes = Math.floor((startTime % 3600) / 60);
    var seconds = startTime % 60;

    // Afficher le temps restant dans le format souhaité (HH:MM:SS)
    document.getElementById('timer').innerHTML = hours.toString().padStart(2, '0') + "h " +
        minutes.toString().padStart(2, '0') + "m " + seconds.toString().padStart(2, '0') + "s";

    // Décrémenter le temps restant d'une seconde
    startTime--;

    // Enregistrer la valeur du timer dans le sessionStorage
    sessionStorage.setItem('timer', startTime.toString());
}, 1000);

// QRCODE

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('qrcode');
    const text = document.getElementById('address').innerText;

    const qrcode = new QRCode(canvas);
    qrcode.makeCode(text);
});

// COPY

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionnez tous les boutons de copie
    const copyButtons = document.querySelectorAll('.copy-btn');

    // Parcourez les boutons de copie et ajoutez un écouteur d'événement à chacun d'eux
    copyButtons.forEach(function(copyButton) {
        const label = copyButton.previousElementSibling;

        copyButton.addEventListener('click', function() {
            // Copiez le texte du label dans le presse-papiers
            var textToCopy = label.innerText;
            navigator.clipboard.writeText(textToCopy)
                .then(function() {
                    // La copie a réussi
                    alert('Le texte a été copié dans le presse-papiers !');
                })
                .catch(function() {
                    // La copie a échoué
                    alert('Une erreur est survenue lors de la copie du texte.');
                });
        });
    });
});
