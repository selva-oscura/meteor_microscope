Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes){
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		if(!user){
			throw new Meteor.Error(401, 'You need to login to make comments');
		}
		if(!commentAttributes.body){
			throw new Meteor.Error(422, 'Please write some content;');
		}
		if(!post){
			throw new Meteor.Error(422, 'Erk...  Error....  Somehow you are submitting a comment, and the server is clueless re: which post is supposed to get the comment.  Things fall apart, the center can not hold, mere anarchy, blah, blah, blah.....');
		}
		comment = _.extend(commentAttributes, 'postId', 'body', {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		return Comments.insert(comment);
	}
});