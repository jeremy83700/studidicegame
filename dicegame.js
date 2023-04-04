/* Règles du jeu */

/*

- Le jeu a 2 joueurs, jouant en tours;
- A chaque tour, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son score ROUND nommé 'enjeu' ;
- MAIS, si le joueur lance un 1, tout son score ROUND est perdu. Après c'est au tour du joueur suivant
- Le joueur peut choisir de "Hold" nommé "prendre la cagnotte", ce qui signifie que son score ROUND 'enjeu" est ajouté à son score GLOBAL. Après cela, c'est au tour du joueur suivant ;
- Le premier joueur à atteindre 100 points sur le score GLOBAL remporte la partie.

*/

/* Code du jeu */

// Déclarer les variables fondamentales du jeu
var scores, roundScore, activePlayer, gamePlaying;

// Initialiser le jeu
init();

// Ajout d'un bouton d'événement roll au bouton qui lance le dé (en utilisant une fonction anonyme)
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // Vérifier si le jeu est en cours de lecture
    if(gamePlaying) {

        // 1. Créer un nombre aléatoire pour les dés
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Afficher le résultat
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';    

        // 3. Mettre à jour le score du tour si le numéro obtenu n'était pas un 1
        if(dice !== 1) {       
            // Ajouter un score si le nombre de dés est différent de 1
            roundScore += dice;    
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Tour du prochain joueur
            nextPlayer();
        }

    }
    
});

// Fonctionnalité qui permet d'accumuler des points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {

        // 1. Ajout du score actuel au score global
        scores[activePlayer] += roundScore; 

        // 2. Mise à jour de l'interface utilisateur
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Vérifier si le joueur a gagné la partie
        if(scores[activePlayer] >= 100) {

            // Changer le nom du joueur en 'Gagnant!'
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant!';

            // Masquer les dès 
            document.querySelector('.dice').style.display = 'none';

            // Ajout de la classe 'winner' au joueur
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // Supprimer le statut de joueur actif du gagnant
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // Changer la variable 'gamePlaying' en 'false' 
            gamePlaying = false;

        } else {
            // Si le joueur gagne la partie, c'est au tour du joueur suivant
            nextPlayer();
        }
    }
});

// Redémarrer le jeu après avoir cliqué sur le bouton "Nouveau jeu" 
document.querySelector(".btn-new").addEventListener('click', init);

// Fonction qui initialise le jeu
function init() {

  // Définir la variable 'gamePlaying' sur 'true'
  gamePlaying = true;

  // Remettre les deux scores à 0
  scores = [0, 0];

  // Redéfinir l'activePlayer sur "Joueur 1"
  activePlayer = 0;

  // Remettre le roundScore à 0
  roundScore = 0;

  // Cacher les dés dès le début du jeu
  document.querySelector('.dice').style.display = 'none';

  // Définir les scores à 0 par défaut (en utilisant la méthode 'getElementById')
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0'; 

  // Supprimer le "statut de gagnant" du joueur gagnant
  document.getElementById('name-0').textContent = 'Joueur 1';
  document.getElementById('name-1').textContent = 'Joueur 2'; 
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Supprimer le "statut actif" du joueur gagnant
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // S'assurer que le « active status» du « Joueur 2 » est supprimé et attribué au « Joueur 1 » 
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

// Fonction pour donner le tour au joueur suivant
function nextPlayer() {
    
    // C'est au tour du joueur suivant si le nombre de dés est 1 (en utilisant l'opérateur ternaire)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Remettre le roundScore à 0
    roundScore = 0;

    // Remettre le score actuel à 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Ajouter la classe active au joueur qui a le tour maintenant
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


// Exemple de suppression d'une classe à l'aide de la méthode remove
    // document.querySelector('.player-0-panel').classList.remove('active');
    // Exemple d'ajout d'une classe à l'aide de la méthode add
    // document.querySelector('.player-1-panel').classList.add('active');

    // Masquer les dés après le changement de joueur actif
    document.querySelector('.dice').style.display = 'none';

}
