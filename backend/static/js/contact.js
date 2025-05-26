document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector("#id_numero");
  const iti = window.intlTelInput(input, {
    initialCountry: "mq",  // Initialisation avec la Martinique
    geoIpLookup: function (success, failure) {
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(data => success(data.country_code))
        .catch(() => success("fr"));
    },
    preferredCountries: ["fr", "gp", "mq", "be", "us"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
  });

  // Lors de la soumission du formulaire
  const form = document.querySelector("form");
  form.addEventListener("submit", function () {
    const fullNumber = iti.getNumber();  // numéro complet, ex: +596696000000
    const dialCode = iti.getSelectedCountryData().dialCode;  // ex: "596"
    const numberWithoutCode = input.value.replace(/\s+/g, '');  // nettoyage

    document.getElementById("indicatif").value = "+" + dialCode;
    document.getElementById("numero_sans_indicatif").value = numberWithoutCode;
    document.getElementById("id_numero").value = fullNumber;
  });
});
