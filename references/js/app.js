$(function(){

	makeEmailAddress();
	makeMobilePhone();
});
	
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

//generate phone number to hide it to robots
function makeMobilePhone(){

	var b = '22 ';
	var a = '28 ';
	var d = '06 ';
	var c = '60';
	var z = '80 ';
	var mobile_phone = d + b + z + a + c;

	$('.mobile-phone').text(mobile_phone);

}
