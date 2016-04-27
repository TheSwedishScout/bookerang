function init_index(){
	// Get the modal
	var modal = document.getElementById('login-box');
	// Get the button that opens the modal
	var btn = document.getElementById("myLoginBtn");
	var btn2 = document.getElementById("myBtn2");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks the button, open the modal 
	btn.addEventListener("click",function() {
	    modal.style.display = "block";
	});
	if(btn2){
		btn2.addEventListener("click",function() {
		    modal.style.display = "block";
		});
	}

	// When the user clicks on <span> (x), close the modal
	span.addEventListener("click", function() {
	    modal.style.display = "none";
	});
	
	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener("click", function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	});
}

document.addEventListener("DOMContentLoaded", init_index);