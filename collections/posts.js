Posts = new Meteor.Collection('posts');  
// no var is used because we want the Posts collection to be available to the whole app
// Code inside folders that are not client/ or server/ will run in both contexts, but the collection does different things within the different envvironments
//on the server, the collection has the job of talking to the Mongo database and writing any changes
// on the client, the collection is a secure copy of a subset of the real, canonical collection; the client-side collection constantly and (mostly) transparently is kept up-to-date with that subset in real-time

/* deprecated after adding post method 
Posts.allow({
	insert: function(userId, doc){
		// only allow posting if user is logged in
		return !! userId;
	}
});
end deprecation */

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldNames){
		//may only edit the following two fieds:
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	postInsert: function(postAttributes){
		check(this.userId, String);
		check(postAttributes, {
			title: String,
			url: String
		});

		// check that there is no previous post with the same link
		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		// ensure the user is logged in
		var user = Meteor.user();
		if(!user){
			throw new Meteor.Error(401, "You need to log in to make a new post.");
		}

		// ensure the post has a url
		if(!postAttributes.url){
			throw new Meteor.Error(422, 'Please fill in the URL');
		}

		// ensure the post has a title
		if(!postAttributes.title){
			throw new Meteor.Error(422, 'Please fill in a title');
		}

		// pick out the whitelisted keys
		var post = _.extend(postAttributes,{
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});