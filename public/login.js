$(document).ready(function(){
	console.log("hello");
	$(".username").val("nicholas.bole@gmail.com");
	$(".password").val("Google34");

	if (window.location.search.substring(1) === "error"){
		console.log('got this far');
		$('.message').html("<div class='alert alert-danger text-center' role='alert'>There was an error signing in.  Please re-enter.</div>");
	}
});
