var state = {
	page: 'welcome',
	filters: []
}

function showPage(page) {
	state.page = page;
}

function selectFilter(filter) {
  function findElement(element) {
    return element === filter;
  }
  
  var found =  state.filters.find(findElement)
  if (!found) { 
    state.filters.push(filter) 
    $(`#filters li[data-name=${ filter }]`).addClass('selected');
  } 
  else {
    var index = state.filters.indexOf(filter)
        state.filters.splice(index, 1)
        $(`#filters li[data-name=${ filter }]`).removeClass('selected');
  }
  
  console.log(state.filters);
}

function performSearch(filters) {
	// Can use these in a request to the server using jQuery AJAX methods.
 	// Review jQuery AJAX.
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