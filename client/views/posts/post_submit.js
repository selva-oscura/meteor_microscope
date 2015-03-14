Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}		
		/* deprecated after shift to calling a method named post to use the server to check data */
		// post._id = Posts.insert(post);
		// Router.go('postPage', post);
		/* end of deprecated section */
		Meteor.call('post', post, function(error, id){
			if(error){
				return alert(error.reason);
			}
			Router.go('postPage', {_id: id});
		});
	}
});