var state = {
	breeds: []
}



function addDataToState(state, data){
	state.breeds.push(data);
	console.log('the state is ', state);
}

function addSelectedData(state, data){
	state.breeds.push(data);
	console.log('the state is ', state);
}

function displayAllData(state){

	var allBreeds = '';
	var header = '<h1><a href="/search">BestBreed</a></h1>';
	var returnToSearch = '<form action="/search"><button type="submit" value="Return to Search">Return to Search</button></form>';
	var favButton = '<button>Add To Favorites</button>';

	for (var i = 0; i<state.breeds[0].length; i++ ) {
		var breedName = state.breeds[0][i].breed;
		var breedDescription = state.breeds[0][i].description;
		var breedImage = state.breeds[0][i].image;
		var breedFilters = state.breeds[0][i].filters;

		state.breeds.forEach(function(item){
			allBreeds += '<div class="searchResult"><img class="resultImg" align="right" src="'+ breedImage +'"/><p class="name">' + breedName + '</p><p class="breedDescr">' + breedDescription + '<br><br><b>Features</b>: ' + breedFilters + '</p>' + favButton + '</div>';
		})
	}

	$('body').html(header + allBreeds + returnToSearch);
}

$(document).ready(function(){
	$('#seeAll').click(function(){
		$.ajax({
			url: '/breeds',
			method: 'get'
		}).done(function(data){
			addDataToState(state, data);
			displayAllData(state);
		});
	});

	$('.list').click(function(){
		$(this).toggleClass('highlight');
	});

	$('.filter-search').click(function(){
		var filters = [];
		$('.list.highlight').each(function(index){
			filters.push($(this).attr('data-name'));
		});

		if(filters.length){
			$.ajax({
				url: '/filter/',
				data: {filters:filters},
				method: 'post'
			}).done(function(data){
				addSelectedData(state, data);
				displayAllData(state);
			});
		} 

		else {
			alert('Please select a filter');
		}
	});

	$('favButton').click(function(){
		$.ajax({
			url: '/favorites',
			method: 'post'
		}).done(function(data){
			addDataToState(state, data);
			displayAllData(state);
		});
	});
})