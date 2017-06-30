var state = {
	page: 'welcome',
	filters: []
}

function showPage(page) {
	state.page = page;
}

function selectFilter(filter) {
	state.filters.push(filter);
}

function render() {
	$('.page').removeClass('current');
	$('.page#' + state.page).addClass('current');

	state.filters.forEach(function(filter) {
		$(`#filters li[data-name=${ filter }]`).addClass('selected');
	})
}

function addListeners() {
	$('#startButton').click(function() {
		showPage('search');
		render();
	})

	$('#filters li').click(function() {
		var filterName = $(this).data('name');
		selectFilter(filterName);
		render();
	})
}

//when page loads...
$(function() {
	render();
	addListeners();
})