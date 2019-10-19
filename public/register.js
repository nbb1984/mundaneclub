
$(document).ready(function(){
	console.log("hello");
	
	$(".submit-button").on("click", function() {
		$(".msg").html("");
		registerUser();
	});

	var registerUser = function() {
		event.preventDefault();
		var	email = $(".email").val();
		var	password = $(".password").val();
		var	password2 = $(".password2").val();

	    $.post("/registerUser", {email: email, password: password, password2: password2}).then(function(result) {
	    	if (result.constructor === Array){
	    		console.log(result);
	    		console.log("registration did not work");
		    	for (var i = 0; i < result.length; i++){
		    		$("<div class='alert alert-danger text-center' role='alert'>)").text(result[i].msg).appendTo(".msg");
		    	}
	    	}
	    	else {	    	
	    	console.log("registration worked!!");	
		    	$("<div class='alert alert-success text-center' role='alert'>)").text("Congratulations!  You are successfully registered.  You may now go to the login page and login!").appendTo(".msg");
	    	}

	    });	    
	}
});

