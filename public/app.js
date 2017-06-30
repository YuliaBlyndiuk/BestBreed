// Render => User Action => Change State => Render ...

// The state describes what's going on in the app.
// Whenever we make a change to the UI, we should first
// describe it in the state.
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
	// Review jQuery AJAX.
	alert(filters);
}

function render() {
	console.log(state);

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

$(function() {
	render();
	addListeners();
})

//breed list data
// var breedList = {
// 	"breed list" : [
// 		{
// 			"Id" : "1",
// 			"Name" : "German Shepherd",
// 			"Description" : "The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. The breed is officially recognized name is German Shepherd Dog in the English language. The breed is also known as the Alsatian in Britain and Ireland.",
// 			"Energy" : "medium",
// 			"Size" : "large",
// 			"Personality" : "smart"
// 		},
// {
// 			"Id" : "2",
// 			"Name" : "Doberman Pinscher",
// 			"Description" : "The Doberman Pinscher, or Dobermann, or Doberman, is a medium-large breed of domestic dog originally developed around 1890 by Karl Friedrich Louis Dobermann, a tax collector from Germany.",
// 			"Energy" : "high",
// 			"Size" : "medium",
// 			"Personality" : "alert"
// 		},
// 		{
// 			"Id" : "3",
// 			"Name" : "Maltese",
// 			"Description" : "The Maltese, Canis familiaris Maelitacus, is a small breed of dog in the Toy Group. It descends from dogs originating in the Central Mediterranean Area.",
// 			"Energy" : "medium",
// 			"Size" : "small",
// 			"Personality" : "gentle"
// 		},
// {
// 			"Id" : "4",
// 			"Name" : "Alaskan Malamute",
// 			"Description" : "The Alaskan Malamute is a large breed of domestic dog originally bred for hauling heavy freight because of their strength and endurance, and later a sled dog. ",
// 			"Energy" : "high",
// 			"Size" : "large",
// 			"Personality" : "loyal"
// 		},
// {
// 			"Id" : "5",
// 			"Name" : "Labrador Retriever",
// 			"Description" : "The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is one of the most popular breeds of dog in the United Kingdom and the United States.",
// 			"Energy" : "high",
// 			"Size" : "medium",
// 			"Personality" : "outgoing"
// 		},
			
// }



