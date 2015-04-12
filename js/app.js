$(function(){

	makeEmailAddress();
	makeMobilePhone();

	var qualities = [
		'rigoureux',
		'passionné',
		'curieux',
		'disponible',
		'heureux'
	];
	var elem = $('.presentation h1');
	//var text = elem.html();
	var begin_text = 'Salut, je suis Matthieu Rébillard, développeur et intégrateur web<br>';
	//var text_length = text.length;
	
	type(elem, begin_text, '', 1, '+', 0, qualities);

	clignoteCurseur();
	
	/*var display_delay = 3000;
	function displayQuality(qualities, quality_id, el){

		//recalage du span en haut du div afin d'afficher la 1ere qualité
		$(el).css('top', -5);

		//calcul de identifiants des qualités
		//quand c'est la fin, retour au départ
		var nb_qualities = qualities.length;
		if( nb_qualities > quality_id + 1){
			quality_id++;
		}else{
			quality_id = 0;
		}

		//calcul des identifiants des qualités suivantes (qualité n+1)
		
		if( nb_qualities == quality_id + 1){
			var next_quality_id = 0;
		}else{
			var next_quality_id = quality_id + 1;
		}

		//enregistrement des 2 qualités dans leurs variables
		var quality = qualities[quality_id];
		var next_quality = qualities[next_quality_id];
		
		//affichage des 2 qualités dans la balise span
		$(el).html(quality + '<br>' + next_quality);
		
		//déplacement animé du span vers le haut
		$(el).velocity({top: -43});


		//boucle de la fonction
		setTimeout(function(){
			displayQuality(qualities, quality_id, el);
		}, display_delay);

		
	}

	//initialisation du bspan avec le texte de la 1ère qualité
	var el = 'h1 .quality';
	$(el).text(qualities[0]);

	//appel de la boucle d'affichage
	setTimeout(function(){
		displayQuality(qualities, -1, el);
	}, display_delay);
*/

});

function type(elem, begin_text, text, pos, dir, iter, qualities){
	current_type = qualities[iter];
	text = ''+ begin_text + current_type +'.';

	var delay = 70;

	content = text.substr(0,pos);
	//on saute le <br>
	if(pos == begin_text.length-4){
		pos = begin_text.length;
	}
	//quand le texte en entièrement affiché, on fait une pause
	//configuartion du delai du setTimeout de la boucle
	if(pos == text.length){
		delay = 4000;
	}
	if(pos < text.length && dir == '+'){
		pos++;
		var text = begin_text;

	}else{
		pos--;
		dir = '-';
		//quand la qualité vient d'être effacée, on change le sens d'écriture
		if(pos == text.length-current_type.length-1){
			dir = '+';

			//et on itère la prochaine qualité
			if(iter < qualities.length-1){
				iter++
			}
			//si on est à la fin du tableau on repart au début
			else{
				iter = 0;
			}
			

		}
	}
	elem.html(content+'<span class="curseur">|</span>');


	setTimeout(function(){
		type(elem, begin_text, text, pos, dir, iter, qualities);
	}, delay);
}
function clignoteCurseur(){
	//$('.curseur').fadeOut(600).fadeIn(600);
	$('.curseur').fadeOut(100).delay(400).fadeIn(100);

	setTimeout(function(){
		clignoteCurseur();
	}, 1000);
}
//generate email address to hide it to robots
function makeEmailAddress(){

	var sep = 'jfuhdnujdsp';
	var b = 'hello';
	var a = '@';
	var d = 'matthieurebillard';
	var c = '.';
	var z = 'fr';
	var mail = b + a + d + c + z;

	$('.email').text(mail);

	//if we want to link this email
	$('.mail-link').attr('href', 'mailto:' + mail).attr('title', 'Envoyer un e-mail');
}

function makeMobilePhone(){

	var b = '22 ';
	var a = '28 ';
	var d = '06 ';
	var c = '60';
	var z = '80 ';
	var mobile_phone = d + b + z + a + c;

	$('.mobile-phone').text(mobile_phone);

}
