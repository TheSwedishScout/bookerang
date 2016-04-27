function init_aktiviteter(){
	ajaxRequest("php/curlRequest.php?url=occasions",printAllActivities)
}
var dates = ["2016-07-01","2016-07-02","2016-07-03","2016-07-04","2016-07-05" ];


function edit(e){
	e.stopPropagation();
	var parentDiv = this.parentNode;
	var parentDiv2 = parentDiv.parentNode; /*LI of aria we will change into the editabale aria.*/
	console.log(parentDiv2);
	
	
}
/*Function när svar från servern över vilka aktiviteter finns*/
function printAllActivities(data){//print out actiitys on screan
	ajaxRequest("php/curlRequest.php?url=activities",activities)

	function activities(akticityData){
		//var for the ul activitys shuld go in to
		
		for(var i = 0; i < akticityData.activities.length; i++){

			var id = akticityData.activities[i].uri.split("/");
			akticityData.activities[i].id = id.reverse()[0];
			akticityData.activities[i].occasions = [];
			for (var x = 0; x < data.occasions.length; x++){
				if (data.occasions[x].activity_id == akticityData.activities[i].id) {
					akticityData.activities[i].occasions.push(data.occasions[x]);
					
				}
			}
			print(akticityData.activities[i]);
		}
	}
}
function indays(occasions){
	var day1 = [];
	var day2 = [];
	var day3 = [];
	var day4 = [];
	var day5 = [];
	for (var i = 1; i < occasions.length; i++) {
		//occasions[i].date
		switch(occasions[i].date){
			case dates[0]:
				day1.push(occasions[i]);
				break;
			case dates[1]:
				day2.push(occasions[i]);
				break;
			case dates[2]:
				day3.push(occasions[i]);
				break;
			case dates[3]:
				day4.push(occasions[i]);
				break;
			case dates[4]:
				day5.push(occasions[i]);
				break;
		}
	};
	var dagar =[day1,day2,day3,day4,day5] 
	return dagar;
}
function print (activityData){
	var newOcorensesArray = [];
	var ul = document.getElementById("mainList");
	var nameInput;
	var li = document.createElement("li");//skapar ett list item som kommer få mer information innan läggs in i mainList
	li.classList.add("user"); // li får classen user
	var userLeft = document.createElement("div"); // skapar ett div element för att plasera info som ska ha information så som namn och knappen "ändra"
	userLeft.classList.add("userLeft"); // ger class till elementet som skapades ovan
	var name = document.createElement("h2"); // skapar ett h2 element
	name.innerHTML = activityData.name; // läger in aktivitetens namn i h2 elementet
	userLeft.appendChild(name); // läger in h2 element i div element
	var andra = document.createElement("button"); // skapar en knapp
	andra.classList.add("andraBTN"); // klägger en class på knappen
	andra.innerHTML = "Ändra"; // skriver "ändra" i knappen
	andra.setAttribute("activity", activityData.id); // får en ny atrebute med namnet "activity" som vi lägger in aktivitets idn //-- kan tas bort
	andra.addEventListener("click", editActivity)
	userLeft.appendChild(andra); // ägger in knappen i div elementet
	li.appendChild(userLeft); // lägger in diven i list element

	//Description
	var description = document.createElement("p"); // skapar ett p element
	description.innerHTML = activityData.description; // lägger in en description i p element
	li.appendChild(description); // lägger p elementet i list elementet
	//ocorenses	
	var divAktiviteter = document.createElement("div")	
	divAktiviteter.classList.add("aktiviteter");

	var dagar = indays(activityData.occasions);
	var ol = [];
	for (var i = 0; i < dagar.length; i++) {
		var dateActivity = document.createElement("p");
		ol[i] =document.createElement("ul"); 
		if (dagar[i][0]){
			dateActivity.innerHTML = dagar[i][0].date;
			ol[i].appendChild(dateActivity);
		
			for (var x = 0; x < dagar[i].length; x++) {
				var liActivity = document.createElement("li");
				liActivity.innerHTML= dagar[i][x].starttime + " - "+ dagar[i][x].endtime +", "+ dagar[i][x].place;
				

				ol[i].appendChild(liActivity);
			}
			divAktiviteter.appendChild(ol[i]);
		}else{
			ol[i].innerHTML = "<li>Inga tillfällen</li>"
			divAktiviteter.appendChild(ol[i]);
		}

	}
	li.appendChild(divAktiviteter)
	ul.appendChild(li); 

	function editActivity(){
		this.textContent = "Spara";
		this.removeEventListener("click", editActivity);
		this.addEventListener("click", saveEditActivity);
		var cancelBTN = document.createElement("button");
		cancelBTN.classList.add("andraBTN")
		cancelBTN.innerHTML = "Avbryt";
		cancelBTN.addEventListener("click", cancel);
		var deleteBTN = document.createElement("button");
		deleteBTN.classList.add("andraBTN")
		deleteBTN.innerHTML = "Delete";
		deleteBTN.addEventListener("click", remove);
		userLeft.appendChild(cancelBTN);
		userLeft.appendChild(deleteBTN);
		userLeft.removeChild(name);
		nameInput = document.createElement("input");
		nameInput.value = name.innerHTML;
		userLeft.insertBefore(nameInput, andra);

		//skapa tabort knapp
		//för varge li i var ul lägg till knappen
		var aktiviteterna = li.getElementsByClassName("aktiviteter")[0];
		var tillfällena = aktiviteterna.getElementsByTagName("li");
		for (var i = 0; i < tillfällena.length; i++) {
			var taBort = document.createElement("img");
			taBort.src = "Images/delete.png";
			//taBort.classList.add("hidden")
			taBort.classList.add("taBort");
			taBort.addEventListener("click", removeOcorens);
			tillfällena[i].appendChild(taBort); 
		}
		debugger;
		

		//visa bort ikonerna och lägg till eventlistener som gör det möjligt att ta bort det tillfälet.
		for (var i = 0; i < ol.length; i++) {
			function newOcorenses (){
				var start = document.createElement("input");
				start.classList.add("aktivitetsInput");
				start.type= "time";
				start.placeholder= "start";
				ol[i].appendChild(start);
				var slut = document.createElement("input");
				slut.classList.add("aktivitetsInput");
				slut.type= "time";
				slut.placeholder= "slut";
				ol[i].appendChild(slut);
				var place = document.createElement("input");
				place.classList.add("aktivitetsPlats");
				place.classList.add("aktivitetsInput");
				place.type= "text";
				place.placeholder= "Plats";
				ol[i].appendChild(place);
				var add = document.createElement("button");
				add.innerHTML= "add"
				ol[i].appendChild(add);
				add.addEventListener("click", addOccerens);
				add.classList.add("aktivitetsInput");
				var tid = dates[i];
				
				function addOccerens(){
					tid;
					place.value;
					start.value;
					slut.value;
					newOcorensesArray.push({"activity_id":activityData.id,"date":tid,"starttime":start.value,"endtime":slut.value,"place":place.value,"min":"5","max":"15","priogroup":"5","responsible":"1"})
					//lägg till det man har skriviy in i fälten till listan med ocorenses samt skicka till apiet*
					var newOccorens = document.createElement("li");
					newOccorens.innerHTML = start.value + " - " + slut.value +", "+ place.value;
					newOccorens.setAttribute("arrayPosition", newOcorensesArray.length)
					var taBort = document.createElement("img");
					taBort.src = "Images/delete.png";
					//taBort.classList.add("hidden")
					taBort.classList.add("taBort");
					newOccorens.appendChild(taBort); 
					start.parentNode.insertBefore(newOccorens, start);
					debugger;
				}
			}
			newOcorenses();
		}
		
		function removeOcorens(){
			this.parentNode.parentNode.removeChild(this.parentNode);
			//debugger;
		}
		/*Lägg in tillfällen som redan finns i en lista samt ge möjlighet att lägga till nya tillfällen*/
		activityData
	}
	function remove(){
		li.innerHTML = "removed";
		activityData.id

		//Skicka till apiet att ta bort denna aktivitet och occerenses och deltagarscheman med denna aktivitet
	}
	function cancel(){
		this.textContent = "Ändra";
		this.previousSibling.innerHTML = "Ändra";
		this.previousSibling.removeEventListener("click", saveEditActivity);	
		this.previousSibling.addEventListener("click", editActivity);
		this.removeEventListener("click", cancel);
		
		userLeft.removeChild(this.nextSibling);
		userLeft.removeChild(this);
		userLeft.removeChild(nameInput);
		userLeft.insertBefore(name, andra);
	}
	function saveEditActivity(){
		for (var i = 0; i < newOcorensesArray.length; i++) {
			newOcorensesArray[i]
			//"activity_id":1,"date":"2016-08-01","starttime":"08:00","endtime":"11:00","place":"Uppe","min":"5","max":"15","priogroup":"5","responsible":"1"

			ajaxRequest("php/curlRequest.php?url=occasions&method=POST&activity_id="+newOcorensesArray[i].activity_id+"&date="+newOcorensesArray[i].date+"&starttime="+newOcorensesArray[i].starttime+"&endtime="+newOcorensesArray[i].endtime+"&place="+newOcorensesArray[i].place+"&min="+newOcorensesArray[i].min+"&max="+newOcorensesArray[i].max+"&priogroup="+newOcorensesArray[i].priogroup+"&responsible="+newOcorensesArray[i].responsible, funkar);
			function funkar(data){
				data;
				debugger;
			}
			debugger;
		}
		ajaxRequest("php/curlRequest.php?method=PUT&url=activities/"+activityData.id+"&name="+nameInput.value, saveEditSucses);
	}
	function saveEditSucses(data){
		andra.textContent = "Ändra";
		userLeft.removeChild(andra.nextSibling);
		userLeft.removeChild(andra.nextSibling);
		userLeft.removeChild(nameInput);
		name.innerHTML = data.activity.name;
		userLeft.insertBefore(name, andra);
		andra.removeEventListener("click", saveEditActivity);	
		andra.addEventListener("click", editActivity);
	}
}

function ajaxRequest(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
        //XHR.msCaching = 'disabled';
    } else {
        XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
        XHR.msCaching = 'disabled';
    }
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 || XHR.readyState == "complete") {
            if (XHR.status == 200) {
            //if (XHR.status == 0) {
                callback(JSON.parse(XHR.response)); 
            } else {
                alert("Unable to connect to the server");
            }
            
        }
    }
    XHR.open("GET", url, true);

    XHR.send(null);
}
document.addEventListener("DOMContentLoaded", init_aktiviteter);