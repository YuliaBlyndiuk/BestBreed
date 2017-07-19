var state = {
	page: 'welcome',
	filters: [],
	dogBreeds: [
	{
		"id": "1",
		"breed": "German Shepherd",
		"filters": ["smart", "large"]
	},
	{
		"id": "2",
		"breed": "Golden Retriever",
		"filters": ["fluffy", "outgoing"]
	},
	{
		"id": "3",
		"breed": "Standard Poodle",
		"filters": ["cute", "non-alergic"]
	}
	]
};

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
}

// function performSearch(filters) {
// 	// Can use these in a request to the server using jQuery AJAX methods.
//  	// Review jQuery AJAX.
//  	// alert(filters);
//  	if (state.filters[i] === state.dogBreeds[i].filters[i]) {
//  		$('body').append('<div>' + this + '</div>');
//  	}
// }

function getAndDisplayAll(argument){
	for (var i = 0; i< state.dogBreeds.length; i++) {
		$('body').append('<div>' + state.dogBreeds[i].breed + '</div>');
	}
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

	// $('#searchButton').click(function() {
	// 	performSearch(state.filters);
	// })

	$('#searchAll').click(function() {
		showPage('results');
		getAndDisplayAll(state);
		render();
		
	})
}

//when page loads...
$(function() {
	render();
	addListeners();
})