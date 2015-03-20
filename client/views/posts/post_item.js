Template.postItem.helpers({
	ownPost: function(){
		return this.userId == Meteor.userId();
	},
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	upvotedClass: function(){
		var userId = Meteor.userId();
		if(userId && !_.include(this.upvoters, userId)){
			return 'btn-primary upvotable';
		}else{
			return 'disabled';
		}
	}
	//deprecated after removal of publication of all comments ,
	// commentsCount: function(){
	// 	return Comments.find({postId: this._id}).count();
	// }
});

Template.postItem.events({
	'click .upvote': function(e){
		e.preventDefault();
		console.log('upvote attempted on', this._id);
		Meteor.call('upvote', this._id);
	}
});