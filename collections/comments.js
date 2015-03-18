Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes){
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		
		//checking that user is logged in, has written a comment, and is commenting on a post
		if(!user){
			throw new Meteor.Error(401, 'You need to login to make comments');
		}
		if(!commentAttributes.body){
			throw new Meteor.Error(422, 'Please write some content;');
		}
		if(!post){
			throw new Meteor.Error(422, 'Erk...  Error....  Somehow you are submitting a comment, and the server is clueless re: which post is supposed to get the comment.  Things fall apart, the center can not hold, mere anarchy, blah, blah, blah.....');
		}
		
		// create the comment object
		comment = _.extend(commentAttributes, 'postId', 'body', {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		
		// update the posts record to indicate the addition of a comment
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});
		
		// deprecated after adding notifications
		// return Comments.insert(comment);

		// insert the comment object into the Comments collection and capturing the _id of the new comment
		comment._id = Comments.insert(comment);

		// call the notification method to inform the post's original poster that there's been a comment
		createCommentNotification(comment);

		return comment._id;
	}
});