var state = {
	page: 'welcome',
	filters: []
}

function showPage(page) {
	state.page = page;
}


// 1: What if filter is already selected? Implement toggle behavior.
function selectFilter(filter) {
	state.filters.push(filter);
}

function performSearch(filters) {
	// Can use these in a request to the server using jQuery AJAX methods.
 +	// Review jQuery AJAX.
 	alert(filters);
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

	$('#searchButton').click(function() {
		performSearch(state.filters);
	})
}

//when page loads...
$(function() {
	render();
	addListeners();
})