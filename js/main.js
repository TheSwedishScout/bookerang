function init_main(){
	var loginBtn = document.getElementById("loginBtn");
	loginBtn.addEventListener("click", loginOpen);
	
}

function loginOpen(e){
	e.preventDefault();
	var loginElem = document.getElementById("loginBtn");/*Login element*/
	/*Open login aria*/
		if(hasClass(loginElem, "hidden")){
			/*Display login elem*/
			
		}else{
			/*hide elem and clear data*/
			
		}
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



document.addEventListener("DOMContentLoaded", init_main);