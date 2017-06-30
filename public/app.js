var state = {
	page: 'welcome'
}

function showPage(page) {
	state.page = page;
}

function render() {
	$('.page').removeClass('current');
	$('.page#' + state.page).addClass('current');
}

function addListeners() {
	$('#startButton').click(function() {
		showPage('search');
		render();
	})
}

//when page loads...
$(function() {
	render();
	addListeners();
})