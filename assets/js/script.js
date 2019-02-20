if(!sessionStorage.getItem('user_name')) {
	populateStorage();
} else {
	if(sessionStorage.getItem('user_name')=="inconnu(e)"){
		rePopulateStorage();
	}
	setName();
}

function populateStorage (){
	var name=prompt("Quel est votre nom?");
	if(name==="" || name===null){
		name="inconnu(e)";
	}
	sessionStorage.setItem('user_name', name);
	setName();
}

function rePopulateStorage(){
	var name=prompt("Comment vous appelez autrement que 'inconnu' ?");
	if(name==="" || name===null){
		name="étranger(e)";
	}
	sessionStorage.setItem('user_name', name);
	setName();
}

function setName (){
	var user_name=sessionStorage.getItem('user_name');
	document.getElementById("intro-text").innerHTML="Cher/chère "+user_name+",";
}