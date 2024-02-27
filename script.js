
var score=0;

function initgame() {
  const images = document.querySelectorAll(".case img");
  
  const imageSources = Array.from(images).map(image => image.src);
  for(var i=0;i<images.length;i++){
    images[i].style.visibility = "hidden";
  }

 
  for (let i = imageSources.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageSources[i], imageSources[j]] = [imageSources[j], imageSources[i]];
  }

  // Associez les sources mélangées aux images du jeu
  images.forEach((image, index) => {
      image.src = imageSources[index];
  });

  var timerElt = document.getElementById("timer");
  timerElt.textContent="60";
  var timerVal=timerElt.textContent;

		
		function diminuerCompteur() {
			
			var timer = Number(timerElt.textContent); 

			if (timer > 1) {
				timerElt.textContent = timer - 1;
			} else {
				// Pour annuler l'exécution répétée de diminution compteur
				clearInterval(intervalId);
				
                alert("Time over! votre score est:"+score);
                
                score=0;
				
		}
        var bStop=document.getElementById('stop');
        bStop.addEventListener('click',function(){clearInterval(intervalId); score=0;})
       	
}

var intervalId = setInterval(diminuerCompteur, 1000/3);
}



var flippedCards = [];
var lockBoard = false;


function detourner(card) {
    
    if (lockBoard) return;

    var image = card.querySelector("img");

    if (!image.style.visibility || image.style.visibility === "hidden") {
        image.style.visibility = "visible"; // Retourner la carte en affichant l'image

        // Ajouter la carte actuellement retournée au tableau des cartes retournées
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            // Comparer les deux cartes retournées
            var img1 = flippedCards[0].querySelector("img");
            var img2 = flippedCards[1].querySelector("img");

            if (img1.src === img2.src) {
                // Les deux cartes correspondent
                flippedCards = [];
                score++;
            } else {
                // Les deux cartes ne correspondent pas, verrouiller le plateau temporairement
                lockBoard = true;
                setTimeout(() => {
                    // Cacher les deux cartes après un court délai
                    img1.style.visibility = "hidden";
                    img2.style.visibility = "hidden";
                    flippedCards = [];
                    lockBoard = false; // Déverrouiller le plateau
                }, 1000); // Ajustez le délai au besoin
            }
        }
    }
}


