
var cards1 = ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg", "cat2.jpg", "cat6.jpg", "cat1.jpg", "cat5.jpg", "cat6.jpg", "cat4.jpg"];
var cards2 = ["cat1.jpg", "cat1.jpg", "cat3.jpg", "cat4.jpg", "cat2.jpg", "cat5.jpg", "cat4.jpg", "cat2.jpg", "cat6.jpg", "cat3.jpg", "cat6.jpg", "cat5.jpg"];
var cards3 = ["cat6.jpg", "cat4.jpg", "cat2.jpg", "cat5.jpg", "cat2.jpg", "cat3.jpg", "cat3.jpg", "cat1.jpg", "cat4.jpg", "cat5.jpg", "cat6.jpg", "cat1.jpg"];

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function hide2Cards(nr, visible_nr) {

	document.querySelector('#c'+nr).setAttribute('style', 'opacity: 0');
	document.querySelector('#c'+visible_nr).setAttribute('style', 'opacity: 0');
	
	pairsLeft--;
	if(pairsLeft == 0)
	{
		document.querySelector('.board').innerHTML = '<h1>You win!<br>Done in '+turnCounter+' turns</h1>';
	}
	lock = false;
}

function restore2Cards(nr1, nr2) {
	document.querySelector('#c'+nr1).setAttribute('style', 'background-image:""');
	document.querySelector('#c'+nr2).setAttribute('style', 'background-image:""');

	document.querySelector('#c'+nr1).classList.add('card');
	document.querySelector('#c'+nr1).classList.remove('cardA');

	document.querySelector('#c'+nr2).classList.add('card');
	document.querySelector('#c'+nr2).classList.remove('cardA');	
	lock = false;
}

function revealCard(e) {

	var opacityValue = e.target.classList.add('opacity');
	var nr = e.target.id.substr(1);

	if(opacityValue != 0 && lock == false) {
		lock = true;
		var obraz = "url(img/"+ cards[nr] +")";
		document.querySelector('#c'+nr).setAttribute('style', 'background-image:'+obraz);
		document.querySelector('#c'+nr).classList.add('cardA');
		document.querySelector('#c'+nr).classList.remove('card');

		if(oneVisible == false)
		{
			//first card
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			if(cards[visible_nr] == cards[nr])
			{
				// console.log("para");
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 1000);
			}
			else
			{
				// console.log("pudło");
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
			}
			turnCounter++;
			document.querySelector('.score').innerText = 'Counter: ' + turnCounter;
			oneVisible = false;
		}		
	}
}

var c = document.querySelectorAll('.card');
var random = Math.floor(Math.random() * 3);
var cards = null;
switch(random) {
	case 0: 
		cards = cards1;break
	case 1: 
		cards = cards2;break;
	case 2: 
		cards = cards3;break;
	default:
		cards = cards1;
}
for(var i=0; i<12; i++) {

	c[i].addEventListener("click", revealCard);
}

































