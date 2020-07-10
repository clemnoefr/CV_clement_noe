var map;
var carte = function () {
    var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        osmAttrib = '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });
    map = L.map("mapid").setView([44.5, -1.0667], 9).addLayer(osm);
    var marker = L.marker([44.35, -1.0667]).addTo(map).bindPopup("Clément Noé");

    // fonction de recherche pour recentrer la map sur un point autre que l'actuel
    var input = document.querySelector("#recherche");
    var button = document.querySelector("#recherche_button");
    
    // création de l'event au clic sur le bouton de recherche
    button.addEventListener("click", () => {
        var input1 = input;
        
        var input_value = input.value;
        var input_modif = input_value.replace(/ /g, "+");
       

        // requete AJAX pour consulter l'API afin de récupérer les coordonnées GPS
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?q=" + input_modif,
            method: "GET",
            success: function (data) {
                longitude1 = data.features["0"].geometry.coordinates["0"]; // on récupère latitude et longitude
                latitude1 = data.features["0"].geometry.coordinates["1"];
                map.setView([latitude1, longitude1], 9);
                // création du marqueur sur le lieu demandé
                var marker2 = L.marker([latitude1, longitude1]).addTo(map).bindPopup("Vous");
                var recentrer = document.querySelector("#localisation");

                // fonction pour recentrer sur la map depuis la position géolocalisée
                recentrer.addEventListener("click", function () {
                    map.setView([44.5, -1.0667], 9);
                    marker2.remove();
                });
            },
            error: function (errors) {
                console.log(errors);
            }
        });
    });
};
// sélection des divers champs/boutons
var mapid = document.querySelector("#mapid");
var oui = document.querySelector("#oui");
var non = document.querySelector("#non");
var rep = document.querySelector("#rep");
var recherche = document.querySelector("#recherche_zone");


// création de la map avec 1 marqueur chez moi et 1 chez la personne qui visite (ou pas de marqueur)

oui.addEventListener("click", function () {
    mapid.className = "d.flex";
    recherche.className = "d.flex content__title-wrap row";
    carte();
    $.getJSON('https://ipapi.co/json/', function (data) {

        var marker1 = L.marker([data.latitude, data.longitude]).addTo(map).bindPopup("Vous");
    });

    rep.className = "d-none";
});

// création map avec 1 seul marqueur
non.addEventListener("click", function () {
    mapid.className = "d.flex";
    recherche.className = "d.flex content__title-wrap row";
    carte();
    rep.className = "d-none";

});











