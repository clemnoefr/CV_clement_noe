var test = 1;
var page = document.querySelector("#page");
var num_page = page["attributes"]["3"]["textContent"];
var previous = document.querySelector("#previous");
var next = document.querySelector("#next");


// fonction pour appeler le controller et afficher les commentaire en AJAX
var ajax = function (e) {
    $.ajax({
        url: "/contact.html/test",
        method: "GET",
        data: {
            page: e,
        },

        success: function (data) {

            var card = document.querySelector("#cards");
            var comment = document.querySelectorAll(".comment");
            // supression des commentaires existants
            if (comment) {
                $(".comment").remove();
            };
            // suppression bouton precedant si la page est là 1ere
            if (num_page > 1) {
                previous["attributes"][0]["value"] = "page-link visible";
            } else { previous["attributes"][0]["value"] = "page-link invisible" };
            
            // insertion des cards
            data.forEach(e => {
                card.insertAdjacentHTML('beforeend', '<div class="card comment"><p>'+e.nom + ' ' +e.prenom+'</p><h2>'+e.comment+'</h2></div>');
            });
            
            
            nb_comment = document.querySelectorAll(".comment").length;
            // supression bouton suivant s'il n'y a pas 4 commentaires (4 étant la limite définie)
            if(nb_comment < 4){
                next["attributes"][0]["value"] = "page-link invisible";
            } else { next["attributes"][0]["value"] = "page-link visible" };
        },
        error: function (errors) {
            console.log(errors);
        }
    });
};



// création des commentaires de la page 1
ajax(1);

// modification numéro de page et appel des commentaires correspondants
previous.onclick = function () {

    page["text"]--;
    num_page--;
    test = num_page;
    
    ajax(test);

};

next.onclick = function () {

    page["text"]++;
    num_page++;
    test = num_page;
    ajax(test);


};


