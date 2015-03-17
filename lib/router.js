Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){ return Meteor.subscribe('posts');}
	// deprecated after restricting subscription just to posts rather than to posts and ALL comments, regardless of post
	// waitOn: function(){ return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];}
});

Router.map(function() {
	this.route('postsList', {path: '/'});
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