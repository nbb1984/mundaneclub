
$(document).ready(function(){
	console.log("hello");
	
	$(".submit-button").on("click", function() {
		$(".msg").html("");
		registerUser();
	});

	$(".email").val("nicholas.bole@gmail.com");
	$(".password").val("Google34");
	$(".password2").val("Google34");

	var registerUser = function() {
		
		var	email = $(".email").val();
		var	password = $(".password").val();
		var	password2 = $(".password2").val();
		console.log(email, password, password2);

	    $.post("/registerUser", {email: email, password: password, password2: password2}).then(function(result) {
	    	if (result.constructor === Array){
	    		console.log("registration did not work");
		    	for (var i = 0; i < result.length; i++){
		    		$("<div class='alert alert-danger text-center' role='alert'>)").text(result[i].msg).appendTo(".msg");
		    	}
	    	}
	    	else {	    	
	    	console.log("registration worked!!");	
		    	$("<div class='alert alert-success text-center' role='alert'>)").text("Congratulations.  You are successfully registered.  You may now go to the login page and login!").appendTo(".msg");
	    	}

	    });	    
	}
});

