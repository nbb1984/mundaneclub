$(document).ready(function(){

	if (window.location.search.substring(1) === "error"){
		console.log('got this far');
		$('.message').html("<div class='alert alert-danger text-center' role='alert'>There was an error signing in.  Please re-enter.</div>");
	}
	if (window.location.search.substring(1) === "success"){
		console.log('got this far');
		$('.message').html("<div class='alert alert-danger text-center' role='alert'>Congratulations.  You are successfully registered.  You may now login!</div>");
	}
});
