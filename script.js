function afficher() {
    // GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD')
        .done(function (users) {
            var page2 = window.open("page2/page2.html"); // open the second page
            page2.onload = function() { // wait for the second page to finish loading
                for (user of users) {
                    page2.document.body.insertAdjacentHTML('beforeend', `
                        <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}</p>
                    `);
                }
            };
        });
}

$("form").submit(function (event){
    event.preventDefault(); // Prevent the form from submitting
    //POST : Envoyer des données au serveur JSON
    $.ajax('https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD', {
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() }),
        contentType : 'application/json',
        type : 'POST'
    }).done(function () {
        afficher(); // Update the displayed data after adding a new user
    });
});

function modifier(){
    //Modifier l'utilisateur avec le id choisi.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch(`https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD/${$("#id").val()}`, {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() })
    }).then(function (){
        //Mette à jour l'affichage de façon dynamique, sans recharger la page
        $("#user"+$("#id").val()).text($("#id").val() + ", " + $("#username").val() + ", " + $("#email").val());
    })
}

function supprimer(){
    //Supprimer le user avec le id choisi à l'aide de la commande ajax fetch et la methode delete du serveur.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch(`https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD/${$("#id").val()}`, {
        method: 'DELETE',
    }).then(function (){
        $("#user"+$("#id").val()).remove();
    });
}

afficher();
