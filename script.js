let usersData; // Variable globale pour stocker les données des utilisateurs

function afficher() {
  // Obtenir les données JSON du serveur
  $.getJSON('https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD')
    .done(function (users) {
      // Stocker les données dans la variable globale
      usersData = users;
    });
}

// Ajouter un gestionnaire d'événements pour le bouton "Aller à 2"
document.querySelector('#boutonAller2').addEventListener('click', function() {
  // Insérer les données des utilisateurs dans le DOM
  if (usersData) {
    document.body.innerHTML = ''; // Effacer le contenu de la page
    for (user of usersData) {
      document.body.insertAdjacentHTML('beforeend', `
        <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}</p>
      `);
    }
  }
});

$("form").submit(function (event){
    event.preventDefault(); // Empêcher le formulaire de soumettre les données
    //POST : Envoyer des données au serveur JSON
    $.ajax('https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD', {
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() }),
        contentType : 'application/json',
        type : 'POST'
    }).done(function () {
        afficher(); // Mettre à jour l'affichage après l'ajout d'un nouvel utilisateur
    });
});

function modifier(){
    //Modifier l'utilisateur avec le id choisi.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch(`https://641b4a3b1f5d999a446043ab.mockapi.io/JasonD/${$("#id").val()}`, {
        method: 'PUT', // ou PATCH
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
