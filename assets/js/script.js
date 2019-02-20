if(!sessionStorage.getItem('user_name')) {
  populateStorage();
} else {
  setName();
}

function populateStorage (){
	var name=prompt("Quel est votre nom?");
	if(name==="" || name===null){
		name="inconnu";
	}
	sessionStorage.setItem('user_name', name);
	setName();
}

function setName (){
	var user_name=sessionStorage.getItem('user_name');
	document.getElementById("intro-text").innerHTML="Cher/chère "+user_name+",";
}