Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()		}		
		/* deprecated after shift to calling a method named post to use the server to check data */
		// post._id = Posts.insert(post);
		// Router.go('postPage', post);
		/* end of deprecated section */
		Meteor.call('postInsert', post, function(error, result){
			if(error){
				return alert(error.reason);
			}
			if(result.postExists){
				alert('This url has already been posted.');
			}
			Router.go('postPage', {_id: result._id});
		});
	}
});