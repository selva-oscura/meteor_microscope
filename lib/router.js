Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// deprecated after adding notifications
	// waitOn: function(){ return Meteor.subscribe('posts');}
	// deprecated after restricting subscription just to posts rather than to posts and ALL comments, regardless of post
	// waitOn: function(){ return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];}
	// deprecated after switching to pagination of posts
	// waitOn: function(){ return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];}
	waitOn: function(){ return Meteor.subscribe('notifications');}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function(){
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count()===this.postsLimit();
		var nextPath = this.route.path({postsLimit: this.postsLimit()+this.increment});
		return {
			posts: this.posts(),
			nextPath: hasMore ? nextPath: null
		};
	}
});

Router.route('/posts/:_id',{
	name: 'postPage', 
	// waitOn: function(){ return [Meteor.subscribe('comments', this.params._id), Meteor.subscribe('posts', this.params._id)]; },
	waitOn: function(){ 
		return Meteor.subscribe('comments', this.params._id); 
	},
	data: function(){ 
		return Posts.findOne(this.params._id); 
	}
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit', 
	data: function(){ 
		return Posts.findOne(this.params._id); 
	}
});

Router.route('/submit', {
	name: 'postSubmit',
	disableProgress: true
});

Router.route('/:postsLimit?',{
	// original path for postsList was '/'
	// new path ('/:postsLimit?') used to pass a parameter for pagination of posts
	name: 'postsList'
	// ,
	// controller: PostsListController
	// waitOn: function(){ 
	// 	var limit = parseInt(this.params.postsLimit) || 5;
	// 	return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit})
	// },
	// data: function(){
	// 	var limit = parseInt(this.params.postsLimit) || 5;
	// 	return{
	// 		posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
	// 	};
	// }
});


var requireLogin = function() {
  	if (! Meteor.user()) {
  		if(Meteor.loggingIn()){
  			this.render(this.loadingTemplate);
  		}else{
  	      	this.render('accessDenied');
  		}
  	}else {
    	this.next();
  	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});