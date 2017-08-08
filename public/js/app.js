var state = {
	breeds: [],
	favorites: []
}

function addDataToState(state, data){
	state.breeds.push(data);
}

function addSelectedData(state, data){
	state.breeds.push(data);
}

function displayAllData(state){

	var allBreeds = '';
	var header = '<nav><ul class="ulNav"><li class="liNav"><a href="/">BestBreed</a></li><li class="liNav"><a href="/search">Breed Search</a></li><li class="liNav"><a href="/favorites">Favorite Breeds</a></li></ul></nav><h1>Selected Breeds</h1>';
	var returnToSearch = '<form action="/search"><button type="submit" class="btn btn-default" value="Return to Search">Return to Search</button></form>';
	var favButton = '<button class="favButton btn btn-default" >Add To Favorites</button>';
	var favList = '<form class="favList" action="/favorites"><button class="btn btn-default" type="submit" value="See My Favorites">See My Favorites</button></form>';

	for (var i = 0; i<state.breeds[0].length; i++ ) {
		var breedName = state.breeds[0][i].breed;
		var breedDescription = state.breeds[0][i].description;
		var breedImage = state.breeds[0][i].image;
		var breedFilters = state.breeds[0][i].filters;
		var breedID = state.breeds[0][i]._id;
	
		allBreeds += '<div class="searchResult" data-breed="'+breedID+'"><img class="resultImg" align="right" src="'+ breedImage +'"/><p class="name">' + breedName + '</p><p class="breedDescr">' + breedDescription + '<br><br><b>Features</b>: ' + breedFilters + '</p>' + favButton + favList + '</div>';	
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

	$('body').on('click','.favButton',function(){
		console.log('clicked');
		var $result = $(this).parent();
		$.ajax({
			url: '/favorites',
			method: 'post',
			data: {breed_id: $result.attr('data-breed')}
		}).done(function(data){
			if($result.hasClass('favoriteResult')){
				$result.remove();
			}
		});
	});
})