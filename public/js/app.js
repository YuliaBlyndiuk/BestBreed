var state = {
	breeds: []
}

function addDataToState(state, data){
	state.breeds.push(data);
	render(state);
	//console.log('now the state is ', state);
}

function render(state) {
	for (var i = 0; i<state.breeds[0].length; i++) {
		$('body').html('<div>' + state.breeds[0][i].breed + '</div>')
	}
}

$(document).ready(function(){
	$('#seeAll').click(function(){+
		$.ajax({
			url: '/breeds',
			method: 'get'
		}).done(function(data){
			//console.log(data);
			addDataToState(state, data);
		});
	});


	$('#filters li').click(function(){
		var filter = $(this).attr('data-name');
		$.ajax({
			url: '/filter/'+filter,
			method: 'get'

		}).done(function(data){
			// parse out the new dogs and render
		});
	});
});