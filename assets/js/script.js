/*Acceuil Script - BEGINNING*/
function welcome(){
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
		var name=prompt("Allez, dites-nous au moins un nom de fantaisie ?");
		if(name==="" || name===null){
			name="étranger(e)";
		}
		sessionStorage.setItem('user_name', name);
		setName();
	}

	function setName (){
		var user_name=sessionStorage.getItem('user_name');
		document.getElementById("intro-text").innerHTML="Bonjour "+user_name+" !";
	}
}
/*Acceuil Script - END*/

/*Restaurants Script - BEGINNING*/
function opening_hours(){
	var date = new Date();
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	var opening;

	/*opening hours of each restaurants, from first to last
	WARNING: number of inner arrays must corresponds to number of rows in html file ==> in restaurants.html, see tr and td .days & .hours in table .opening_hours*/
	var opening_hours = [
	        {	/*restaurant 1*/
	            days:[["Lun","Mer","Jeu"],["Mar","Sam","Dim"],["Ven"]],
	            hours:[[9, 24],[17, 24],[null]]
	        },
	        {	/*restaurant 2*/
	           	days:[["Lun","Mer","Jeu"],["Dim"],["Mar","Ven","Sam"]],
	            hours:[[14,15],[null],[15, 17]]
	        },
	        {	/*restaurant 3*/
	           	days:[["Lun","Mer","Jeu"],["Mar","Ven","Sam"],["Dim"]],
	            hours:[[11, 14],[18, 19],[11, 23]]
	        }
	    ];

	/*function that writes hours in a a common format*/
	function write_hours(hour){
		var hours;
		if(hour[0]===null){
			hours="fermé";
		}
		else{
			hours=hour[0]+"h-"+hour[1]+"h";
		}
		return hours;
	}
	/*function that write list of days*/
	function write_days(day){
		var days="";
		for(var y=0;y<day.length-1;y++){
			days=days+day[y]+", ";
		}
		return days+day[day.length-1];
	}

	/*--> go through each restaurant, i being the restaurant index*/
	for(var i=0;i<document.querySelectorAll(".restaurant").length;i++){
		/*=> set opening hours of each restaurant, based on the opening_hours[] array, x being the schedule line*/
			for(var x=0; x<document.querySelectorAll(".restaurant")[i].querySelectorAll(".days").length;x++){
				document.querySelectorAll(".restaurant")[i].querySelectorAll(".days")[x].innerHTML = write_days(opening_hours[i].days[x]);
				document.querySelectorAll(".restaurant")[i].querySelectorAll(".hours")[x].innerHTML =write_hours(opening_hours[i].hours[x]);
				if(opening=="fermé" || !opening){
					opening_check(opening_hours[i].days[x], opening_hours[i].hours[x]);
				}
			}
		document.querySelectorAll(".current_date")[i].innerHTML = "Nous sommes le "+date.toLocaleDateString('fr-FR', options);
		document.querySelectorAll(".current_time")[i].innerHTML = ", il est " + pad2(date.getHours())+"h"+pad2(date.getMinutes());
		document.querySelectorAll(".open_check")[i].innerHTML = "Ce restaurant est donc "+opening;
		opening=null;
	}

	/*function to check if the restaurant is open given the opening hours compared to the current date and time*/
	function opening_check(days, hour){
		if(days.includes(string_day(date.getDay()))){
			if(date.getHours()>= hour[0] && date.getHours()<hour[1]){
				opening="ouvert";
			}
			else{
				opening="fermé";
			}
		}
		else{
			opening="fermé";
		} 
	}
	/*function to convert the day index of the week into a string*/
	function string_day(day_index){
		var day;
		switch(day_index){
			case 0:
				day="Dim";
			break;
			case 1:
				day="Lun";
			break;
			case 2:
				day="Mar";
			break;
			case 3:
				day="Mer";
			break;
			case 4:
				day="Jeu";
			break;
			case 5:
				day="Ven";
			break;
			case 6:
				day="Sam";
			break;
		}
		return day;
	}
}
/*Restaurants Script - END*/

/*function to make appear numbers as two-digits i.e. if value = 1 --> pad2(value) will return 01*/
function pad2(number) {
return (number < 10 ? '0' : '') + number;
}