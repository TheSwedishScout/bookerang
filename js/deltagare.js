function init(){

	//document.getElementById("savebutton").addEventListener("click", newUser);
	document.getElementById("Newinfo").addEventListener("click", newUser);
	

	ajaxRequest("php/getUserschedules.php", userschedul);
	
}
var userschedules =[];
function userschedul(data){
	for (var i = 0; i < data.userschedules.length; i++){
		userschedules[i]=data.userschedules[i];
		
	}
	ajaxRequest("php/getAcivities.php",activitiesData);
}
var activities =[];
function activitiesData(data){
	for (var i = 0; i < data.activities.length; i++){
		activities[i]=data.activities[i];
		var uri = data.activities[i].uri;
		var id = uri.split("/");
		activities[i].id= id.reverse()[0];
		
	}
	ajaxRequest("php/getOccasions.php",occasionsData); // roppar efter användare efter occations för att ha möjlighet att lägga in occations samtidigt som deltagare
}
var occasions =[];
function occasionsData(data){
	//debugger;
	for (var i = 0; i < data.occasions.length; i++){
		occasions[i]=data.occasions[i];
		var activitie = occasions[i].activity_id;
		for (var x = 0; x < activities.length; x++ ){
			if (activities[x].id == occasions[i].activity_id){
				var idAc = x;
			}
		}
		occasions[i].activitie = activities[idAc];//kolla så att activities[].id stämmer överens med occasions[i].activity_id;

	}

	ajaxRequest("php/getUsers.php",userData); // roppar efter användare efter occations för att ha möjlighet att lägga in occations samtidigt som deltagare
}

function newUser(e){
	var newUserProfile = {};
	e.preventDefault();
	var newUserButton = e.currentTarget;
	newUserButton.removeEventListener("click", newUser)
	newUserButton.addEventListener("click", toggleNewUser);
	
	var div = document.createElement("div");
	div.classList.add("activities");
	var inputName = document.createElement("input");
	
	div.classList.add("activities");
	div.classList.add("edit");
	div.id = "newUser"

	var prioDiv = document.createElement("div");
	prioDiv.classList.add("prio");
	prioDiv.classList.add("gron");
	prioDiv.setAttribute("prioClass", 2);

	var editButton = document.createElement("button");
	editButton.innerHTML = "Skapa";
	editButton.disabled = true;
	inputName.classList.add("userNamn")
	inputName.addEventListener("change", function(){
		if (/^\s*$/.test(inputName.value)){
		   //value is either empty or contains whitespace characters
		   //do not append the value
		   editButton.disabled = true;
		}else{
			if(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/.test(inputName.value)){
				editButton.disabled = false;
			}else{
				//console.log("hej")
		   		editButton.disabled = true;
			}

		   //code for appending the value to url
		}
	});
	editButton.addEventListener("click", saveNewUser);

		// ändra prio grupp
	var userGroup = div.getElementsByTagName("div")[0];
	var selectInput = document.createElement("select");
	selectInput.classList.add("prioGroup");

	/*Skapa options */
	var gron = document.createElement("option");
	gron.innerHTML = "Grön";
	gron.classList.add("gron");
	gron.value = 1; 
	selectInput.appendChild(gron)

	var rod = document.createElement("option");
	rod.innerHTML = "Röd";
	rod.classList.add("rod");
	rod.value = 2;
	selectInput.appendChild(rod);

	var bla = document.createElement("option");
	bla.innerHTML = "Blå";
	bla.classList.add("bla");
	bla.value = 3;
	selectInput.appendChild(bla)

	var lila = document.createElement("option");
	lila.innerHTML = "Lila";
	lila.classList.add("lila");
	lila.value = 4;
	selectInput.appendChild(lila);

	var rasa = document.createElement("option");
	rasa.innerHTML = "Rosa";
	rasa.classList.add("rasa");
	rasa.value = 5;
	selectInput.appendChild(rasa);
	
	
	//Slut på options
	//om prio är samma som färgens value sätt den som selected
	
	


	/*-----------------------------------------------------------------------------------------\\
	||--------------------------------VALBARA AKTIVITETER START--------------------------------||
	\\-----------------------------------------------------------------------------------------*/

	var ul = document.createElement("ul");
	ul.classList.add("aktiviteter");
	var lable = document.createElement("h3");

	lable.innerHTML= "Aktiviteter";
	ul.appendChild(lable);

	var dagar = indays();
		//för var dag skapa en ol med en strong i sedan en select med optionsen för varge tillfälle

		for(var x = 0; x < dagar.length; x++){
			var olActivity = document.createElement("ol");
			olActivity.innerHTML = "<strong>" + dagar[x][0].date + "</strong>";
			//select med options
			var select = document.createElement("select");
			select.classList.add("activitySelect");
			
			for (var y = 0; y < dagar[x].length; y++) {
				var id = dagar[x][y].uri.split("/");
				dagar[x][y].id = id.reverse()[0];
				
				//kolla om deltagaren har aktiva aktiviteten //user.aktivities

				
					var option = document.createElement("option");
					option.innerHTML =  dagar[x][y].activitie.name +" "+ dagar[x][y].starttime +" - "+ dagar[x][y].endtime;
					option.value = dagar[x][y].id;
					select.appendChild(option);
				


				
 			};
 			//button
 			function addActivityNewUser(e){
				e.preventDefault();
				var select = e.toElement.previousElementSibling;
				var list = select.previousElementSibling;
				var aktivitet = {};
				aktivitet.id = select.value;
				var listItem = document.createElement("li");
				aktivitet.name = occasions[aktivitet.id].activitie.name;
				aktivitet.start = occasions[aktivitet.id].starttime;
				aktivitet.end = occasions[aktivitet.id].endtime;
				listItem.setAttribute("aktivity_id", aktivitet.id);
				listItem.innerHTML = aktivitet.name +" "+ aktivitet.start + " - " + aktivitet.end ;
				list.appendChild(listItem);
				newUserProfile.occasions.push(aktivitet.id);
				//debugger;
				for (var z = 0; z < select.length; z++) {
					if(select[z].value == aktivitet.id){
						select[z];
						select[z].parentNode.removeChild(select[z]);
						//debugger;
					}
				}
				
				// var url_sparaaktivitet = "saveUserschedules.php?user_id=1&user_prio=1&occasion_id;";
				//ajaxRequest(url_sparaaktivitet,aktivitetSparad);
			}
 			var addbtn = document.createElement("button");
 			addbtn.className = "addbtn";
 			addbtn.innerHTML = "Add";
 			addbtn.addEventListener("click", addActivityNewUser);
 			newUserProfile.occasions = [];

			ul.appendChild(olActivity);
			ul.appendChild(select);
			ul.appendChild(addbtn);
			
		}



	div.appendChild(prioDiv);
	div.appendChild(inputName);
	div.appendChild(editButton);
	div.appendChild(selectInput);
	div.appendChild(ul);

	newUserButton.parentNode.insertBefore(div,newUserButton.nextSibling);


	function saveNewUser(){
		var newUserElem = document.getElementById("newUser");

		newUserProfile.name = inputName.value;
		newUserProfile.prioGroup = div.getElementsByClassName("prioGroup")[0].value;
		//tar bort ny deltagare området
		newUserElem.parentNode.removeChild(newUserElem);
		document.getElementById("Newinfo").removeEventListener("click", toggleNewUser);
		document.getElementById("Newinfo").addEventListener("click", newUser);
		var url = "php/newUser.php?name="+newUserProfile.name+"&prio="+newUserProfile.prioGroup;
		//php/saveUser.php?name=Erik&id=1
		ajaxRequest(url, saveNewAktiviteter);
		
		//ha respons function i denna function för creatre user för att kunna lägga till aktiviteter
		
	}
	function saveNewAktiviteter(data){
		newUserProfile.occasions;
		document.getElementById("allUsers").innerHTML = "";
		document.getElementById("allUsers").innerHTML = "";
		ajaxRequest("php/getUserschedules.php", userschedul);

		//debugger;
	}
	

}
function toggleNewUser(){
	document.getElementById("newUser").classList.toggle("hidden");

}


function contains(myArray, needle) {
	for (var i = 0; i < myArray.length; i++) {
		if (myArray[i] == needle){
			return true;
		}
	}
	return false;
};
/*
function priogroupColor(priogroupNR){
	var color;
	
	switch(priogroupNR) {
		case 1:
			color = "gron";
			break;
		case 2:
			color = "rod";
			break;
		case 3:
			color = "bla";
			break;
		case 4:
			color = "lila";
			break;
		case 5:
			color = "rasa";
			break;
		default:
			color = "missing";
		}
		return color;
}
*/
function priogroupColor(priogroupNR){
	var color;
	
	switch(priogroupNR) {
		case "1":
			color = "gron";
			break;
		case "2":
			color = "rod";
			break;
		case "3":
			color = "bla";
			break;
		case "4":
			color = "lila";
			break;
		case "5":
			color = "rasa";
			break;
		default:
			color = "missing";
		}
		return color;
}
function indays(){
	var day1 = [];
	var day2 = [];
	var day3 = [];
	var day4 = [];
	var day5 = [];
	for (var i = 0; i < occasions.length; i++) {
		//occasions[i].date
		switch(occasions[i].date){
			case "2016-07-01":
				day1.push(occasions[i]);
				break;
			case "2016-07-02":
				day2.push(occasions[i]);
				break;
			case "2016-07-03":
				day3.push(occasions[i]);
				break;
			case "2016-07-04":
				day4.push(occasions[i]);
				break;
			case "2016-07-05":
				day5.push(occasions[i]);
				break;
		}
	};
	var dagar =[day1,day2,day3,day4,day5] 
	return dagar;
}
function userData(data){
	var allaUser = document.getElementById("allUsers");
	for (var i = 0; i < data.users.length; i++){
		var user={};
		user.name = data.users[i].name;
		user.priogroup = data.users[i].priogroup;
		user.group = data.users[i].usergroup;
		var uri = data.users[i].uri;
		var id = uri.split("/");
		user.id = id.reverse()[0];

		
		var li = document.createElement("li");
		li.setAttribute("user_id", user.id);
		li.classList.add("activities");
		var h3 = document.createElement("h3");
		h3.classList.add("userNamn");
		h3.innerHTML = user.name;
		
		var prioDiv = document.createElement("div");
		prioDiv.classList.add("prio");
		var color = priogroupColor(user.priogroup);
		prioDiv.classList.add(color);
		prioDiv.setAttribute("prioClass", user.priogroup);
			
			//"Images/Boomerang-logo.png"
		if(user.group == "responsible"){
			var userImage = document.createElement("img");
			userImage.src = "Images/Boomerang-logo.png";
			userImage.classList.add("status");
			li.appendChild(userImage);
			
		}
		var editButton = document.createElement("button");
		editButton.innerHTML = "Ändra";
		editButton.addEventListener("click", prepareEditUser)

		li.appendChild(prioDiv);
		li.appendChild(h3);
		li.appendChild(editButton);
		
		allaUser.appendChild(li);
	}
}
function prepareEditUser(e){
	var button = e.currentTarget;
	var li = e.currentTarget.parentNode;
	//Hämta users id
	var user ={};
	user.id = li.attributes[0].nodeValue;

	user.aktivities = []
	for (var i = 0; i < userschedules.length; i++) {
		if(userschedules[i].user_id == user.id){
			user.aktivities.push(userschedules[i].occasion_id);
		}
		
	}
	editUser(button, li, user)

}

function editUser(editButton, li, user){	
	//var li = e.currentTarget.parentNode;
	li.classList.add("edit");
	//editButton = e.currentTarget;
	editButton.innerHTML = "Spara";
	var cancelButton = document.createElement("button");
	cancelButton.innerHTML = "Avbryt";
	cancelButton.addEventListener("click", cancel)
	editButton.parentNode.insertBefore(cancelButton, editButton);
	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	editButton.parentNode.insertBefore(deleteButton, editButton.nextSibling);
	deleteButton.addEventListener("click", function (){removeUser(user,li)});

	

	/*	skapa ett form elements start tag innanför list item*/
	
	var userName = li.getElementsByClassName("userNamn")[0];
	var inputName = document.createElement('input'); //skappar ett nytt element av typen input
	user.oldName= userName.innerHTML;
	inputName.value = user.oldName; // sätter värdet i inputet till det som stog i h3 tagen innan
	inputName.classList.add("userNamn");
	userName.parentNode.insertBefore(inputName, userName); // Sätter in ett nytt element före User name
	userName.parentNode.removeChild(userName); //tar bort det gamla user name
	inputName.addEventListener("change", function(){
		if (/^\s*$/.test(inputName.value)){
		   //value is either empty or contains whitespace characters
		   //do not append the value
		   editButton.disabled = true;
		}else{
			if(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/.test(inputName.value)){
				editButton.disabled = false;
			}else{
				//console.log("hej")
		   		editButton.disabled = true;
			}

		   //code for appending the value to url
		}
	});
	
	// ändra prio grupp
	var userGroup = li.getElementsByTagName("div")[0];
	user.prio = userGroup.getAttribute("prioClass");
	var selectInput = document.createElement("select");
	selectInput.classList.add("prioGroup");
	//visa valbara aktiviteter
	var select = li.getElementsByClassName("hidden")[0];
	/*Skapa options */
	var gron = document.createElement("option");
	gron.innerHTML = "Grön";
	gron.classList.add("gron");
	gron.value = 1; 
	selectInput.appendChild(gron)

	var rod = document.createElement("option");
	rod.innerHTML = "Röd";
	rod.classList.add("rod");
	rod.value = 2;
	selectInput.appendChild(rod);

	var bla = document.createElement("option");
	bla.innerHTML = "Blå";
	bla.classList.add("bla");
	bla.value = 3;
	selectInput.appendChild(bla)

	var lila = document.createElement("option");
	lila.innerHTML = "Lila";
	lila.classList.add("lila");
	lila.value = 4;
	selectInput.appendChild(lila);

	var rasa = document.createElement("option");
	rasa.innerHTML = "Rosa";
	rasa.classList.add("rasa");
	rasa.value = 5;
	selectInput.appendChild(rasa);
	
	
	//Slut på options
	//om prio är samma som färgens value sätt den som selected
	
	for(var i = 0; i < selectInput.childNodes.length; i++){
		if(selectInput.childNodes[i].value == user.prio){
			selectInput.childNodes[i].selected = true		
		}else{
			//missing
		}
	}
	li.appendChild(selectInput);

	
		var ul = document.createElement("ul");
		ul.classList.add("aktiviteter");
		var lable = document.createElement("h3");

		lable.innerHTML= "Aktiviteter";
		ul.appendChild(lable);

		//sortera upp occasions så att man har en variabel för var dag
		var dagar = indays();
		//för var dag skapa en ol med en strong i sedan en select med optionsen för varge tillfälle

				debugger;
		for(var x = 0; x < dagar.length; x++){
			var olActivity = document.createElement("ol");
			olActivity.innerHTML = "<strong>" + dagar[x][0].date + "</strong>";
			//select med options
			var select = document.createElement("select");
			select.classList.add("activitySelect");
			
			for (var y = 0; y < dagar[x].length; y++) {
				var id = dagar[x][y].uri.split("/");
				dagar[x][y].id = id.reverse()[0];
				
				//kolla om deltagaren har aktiva aktiviteten //user.aktivities

				if (contains(user.aktivities, dagar[x][y].id)){
					//lägg till i element i listan för valda aktiviteter
					
					var test = document.createElement("li");
					test.innerHTML = dagar[x][y].activitie.name +" "+ dagar[x][y].starttime +" - "+ dagar[x][y].endtime;
					test.setAttribute("aktivity_id", dagar[x][y].id);
					olActivity.appendChild(test);

				}else{
					var option = document.createElement("option");
					option.innerHTML =  dagar[x][y].activitie.name +" "+ dagar[x][y].starttime +" - "+ dagar[x][y].endtime;
					option.value = dagar[x][y].id;
					select.appendChild(option);
				}


				
 			};
 			//button
 			var addbtn = document.createElement("button");
 			addbtn.className = "addbtn";
 			addbtn.innerHTML = "Add";
 			user.newAktiviteter=[];
 			addbtn.addEventListener("click", function(){
				event.preventDefault();
				this.previousElementSibling;
				var select = this.previousElementSibling;
				var list = this.previousElementSibling.previousElementSibling;
				var aktivitet = {};
				aktivitet.id = this.previousElementSibling.value;
				var listItem = document.createElement("li");
				aktivitet.name = occasions[aktivitet.id].activitie.name;
				aktivitet.start = occasions[aktivitet.id].starttime;
				aktivitet.end = occasions[aktivitet.id].endtime;
				listItem.setAttribute("aktivity_id", aktivitet.id);
				listItem.innerHTML = aktivitet.name +" "+ aktivitet.start + " - " + aktivitet.end ;
				list.appendChild(listItem);
				user.newAktiviteter.push(aktivitet.id);
				//debugger;
				for (var z = 0; z < select.length; z++) {
					if(select[z].value == aktivitet.id){
						select[z];
						select[z].parentNode.removeChild(select[z]);
						//debugger;
					}
				}
			});
			ul.appendChild(olActivity);
			ul.appendChild(select);
			ul.appendChild(addbtn);
			
		}
		li.appendChild(ul);

	
	editButton.removeEventListener("click", prepareEditUser); //tar bort  event listener för klick, editUser
	editButton.addEventListener("click", saveEditedUser);

	function cancel(){
		var userName = document.createElement('h3');//skappar ett nytt element av typen h3
		userName.innerHTML = user.oldName; // sätter värdet i inputet till det som stog i h3 tagen innan
		userName.classList.add("userNamn")
		inputName.parentNode.insertBefore(userName, editButton.previousSibling);
		inputName.parentNode.removeChild(userName.previousSibling); //tar bort det gamla user name
		editButton.innerHTML = "Ändra"; // ändrar tilbaka texten på knappen
		editButton.nextSibling.parentNode.removeChild(editButton.nextSibling); // tar port Delete
		editButton.previousSibling.parentNode.removeChild(editButton.previousSibling); // tar bort avbryt
		li.getElementsByClassName("prioGroup")[0].parentNode.removeChild(li.getElementsByClassName("prioGroup")[0]); // tar bort avbryt
		li.classList.remove("edit");

		var aktiviteterElem = li.getElementsByClassName("aktiviteter")[0];
		aktiviteterElem.parentNode.removeChild(aktiviteterElem);
		user;
		editButton.removeEventListener("click", saveEditedUser); // fixar knappens funktioner
		editButton.addEventListener("click", prepareEditUser);
	}
	


	function saveEditedUser(e){
		e.preventDefault();
		
		
		editButton.innerHTML = "Ändra"; // ändrar tilbaka texten på knappen
		editButton.nextSibling.parentNode.removeChild(editButton.nextSibling);
		editButton.previousSibling.parentNode.removeChild(editButton.previousSibling);
		li.classList.remove("edit");
		var aktiviteters_id = li.querySelectorAll('[aktivity_id]');
		user.aktiviteter = [];
		
		for (var i = 0; i < aktiviteters_id.length; i++) {
			user.aktiviteter.push(aktiviteters_id[i].attributes[0].nodeValue);
		}
		//ta bort aktivitets listan 
		//Ändrar inputen till en h3 tag
		var inputName = li.getElementsByClassName("userNamn")[0];
		var userName = document.createElement('h3');//skappar ett nytt element av typen h3
		userName.innerHTML = inputName.value; // sätter värdet i inputet till det som stog i h3 tagen innan
		userName.classList.add("userNamn");
		inputName.parentNode.insertBefore(userName, inputName); // Sätter in ett nytt element före User name
		inputName.parentNode.removeChild(inputName); //tar bort det gamla user name
		user.name = userName.innerHTML;
		//ta bort aktivitets listan 
		var aktiviteterElem = li.getElementsByClassName("aktiviteter")[0];
		aktiviteterElem.parentNode.removeChild(aktiviteterElem);
		

		//ändra färg
		var prioGroupElem = li.getElementsByClassName("prioGroup")[0]
		user.prioGroup = li.getElementsByClassName("prioGroup")[0].value; // sifra på värdet av priogrupp
		var displayedColor = li.getElementsByClassName("prio")[0];
		displayedColor.setAttribute("prioClass", user.prioGroup);
		displayedColor.className= "prio " + priogroupColor(user.prioGroup);
		prioGroupElem.parentNode.removeChild(prioGroupElem);

		var url = "php/saveUser.php?name="+user.name+"&id="+user.id+"&prio="+user.prioGroup;
		//php/saveUser.php?name=Erik&id=1
		editButton.removeEventListener("click", saveEditedUser);
		editButton.addEventListener("click", prepareEditUser);
		ajaxRequest(url, saved);
		
		//skicka till apiet user.innerHTML, prioGroup	
		function saved(data){
			for (var i = 0; i < user.newAktiviteter.length; i++) {
				user.newAktiviteter[i]
				var occation = {
					"approved":false,
					"decided":false,
					"occasion_id":user.newAktiviteter[i],
					"uri":"http://cloud.wilhelmsson.eu:5521/bookerang/api/v1.0/userschedules/"+user.newAktiviteter[i],
					"user_id":user.id,
					"user_prio":user.prioGroup
				};
				userschedules.push(occation);
			}

		}
	}
}
function removeUser(user, li){
	//li.classList.add("hidden");
	ajaxRequest("php/deleteUsers.php?user="+user.id, removedUser);
	function removedUser(data){
		li.innerHTML = "Removed";
		li.classList.remove("edit");
		li.classList.remove("activities");
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
    //debugger;
    XHR.send(null);
}

document.addEventListener("DOMContentLoaded", init);