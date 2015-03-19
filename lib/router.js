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

Router.map(function() {
	this.route('postEdit', {
		path: '/posts/:_id/edit',
		data: function(){ return Posts.findOne(this.params._id); }
	});
	this.route('postSubmit', {
		path: '/submit'
	});
	// deprecated after restricting subscription of all pages to posts and specific pages to post and comments related to that page/post
	// this.route('postPage', {
	// 	path: '/posts/:_id',
	// 	data: function(){ return Posts.findOne(this.params._id); }
	// });
	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function(){ return Meteor.subscribe('comments', this.params._id); },
		data: function(){ return Posts.findOne(this.params._id); }
	});
	// original path for postsList was '/'
	// new path ('/:postsLimit>') used to pass a parameter for pagination of posts
	this.route('postsList', {
		path: '/:postsLimit?',
		waitOn: function(){ 
			var postsLimit = parseInt(this.params.postsLimit) || 5;
			return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: postsLimit})
		},
		data: function(){
			var postsLimit = parseInt(this.params.postsLimit) || 5;
			return{
				posts: Posts.find({}, {sort: {submitted: -1}, limit: postsLimit})
			};
		}
	});
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