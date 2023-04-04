

// Declaration des variables du jeu 
var scores, roundScore, activePlayer, gamePlaying;

// Initilisation du jeu
init();

// Ajout d'un bouton d'événement au bouton qui lance le dé (en utilisant une fonction anonyme)
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // Vérifier si le jeu est en cours de lecture
    if(gamePlaying) {

        // 1. Creer un nombre aleatoire pour le dé
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

// Fonctionnalité qui permet d'accumuler des points ('Prendre la cagnotte')
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {

        // 1. Ajout du score actuel au score global
        scores[activePlayer] += roundScore; 

        // 2. Mise à jour de l'interface utilisateur (UI)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Vérifier si le joueur a gagné la partie
        if(scores[activePlayer] >= 100) {

            // Changer le nom du joueur en 'Gagnant!'
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant!';

            // Masquer les dés
            document.querySelector('.dice').style.display = 'aucun';

            // Ajout de la classe 'vainqueur' au joueur
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('Gagnant');

            // Supprimer le statut de joueur actif du gagnant
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // Changer la variable 'gamePlaying' en 'false' 
            gamePlaying = false;

        } else {
            // Si le joueur gagne la partie, alors c'est au tour du joueur suivant
            nextPlayer();
        }
    }
});

// Restarting the game after clicking the 'New Game' button 
document.querySelector(".btn-new").addEventListener('click', init);

// Function that initializes the game
function init() {

  // Setting the 'gamePlaying' variable to 'true' 
  gamePlaying = true;

  // Setting both scores back to 0
  scores = [0, 0];

  // Setting the activePlayer back to being 'Player 1'
  activePlayer = 0;

  // Setting the roundScore back to 0
  roundScore = 0;

  // Hiding the dice right from the beggining of the game
  document.querySelector('.dice').style.display = 'none';

  // Setting the scores to 0 by default (using the 'getElementById' method)
  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-2').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0'; 

  // Removing the 'winner status' from the winning player
  document.getElementById('name-1').textContent = 'Player 1';
  document.getElementById('name-2').textContent = 'Player 2'; 
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');

  // Removing the 'active status' from the winning player 
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-2-panel').classList.remove('active');

  // Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'  
  document.querySelector('.player-2-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');

}

// Function to giving the turn to the next player
function nextPlayer() {
    
    // It's the next player's turn if the dice number is 1 (using the ternary operator)
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;

    // Setting the roundScore back to 0
    roundScore = 0;

    // Setting the current score back to 0
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';

    // Adding the active class to the player who has the turn now
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');

    // Example of removing a class using the remove method 
    // document.querySelector('.player-0-panel').classList.remove('active');
    // Example of adding a class using the add method 
    // document.querySelector('.player-1-panel').classList.add('active');

    // Hiding the dice after the active player changes 
    document.querySelector('.dice').style.display = 'none';

}

/****************/
/* EXAMPLE CODE */
/****************/

// The 'innerHTML' method is used if we want to change the style of text using HTML (setter) 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// The 'textContent' method don't set HTML, just plain text (setter)
// document.querySelector('#current-' + activePlayer).textContent = dice;

// Example of reading the content of an element and storing it on a variable (getter)
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// Example of removing a class using the remove method 
// document.querySelector('.player-0-panel').classList.remove('active');
// Example of adding a class using the add method 
// document.querySelector('.player-1-panel').classList.add('active');