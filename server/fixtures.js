if (Posts.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var tomId = Meteor.users.insert({
		profile: { name: 'Tom Coleman' }
	});
	var tom = Meteor.users.findOne(tomId);
	var sachaId = Meteor.users.insert({
		profile: { name: 'Sacha Greif' }
	});
	var sacha = Meteor.users.findOne(sachaId);

	// create posts
	var telescopeId = Posts.insert({
		title: 'Introducing Telescope',
		userId: sacha._id,
		author: sacha.profile.name,
		url: 'http://sachagreif.com/introducing-telescope/',
		submitted: now - 7 * 3600 * 1000,
		commentsCount: 2
	});

	var MeteorId = Posts.insert({
		title: 'Meteor',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://meteor.com',
		submitted: now - 4 * 3600 * 1000, 
		commentsCount: 0
	});

	var MeteorBookId = Posts.insert({
		title: 'The Meteor Book',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://themeteorbook.com',
		submitted: now - 12 * 3600 * 1000,
		commentsCount: 0
	});

	// create comments
	Comments.insert({
		postId: telescopeId,
		userId: tom._id,
		author: tom.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: 'Interesting project, Sacha.  Can I get involved?'
	});

	Comments.insert({
		postId: telescopeId,
		userId: sacha._id,
		author: sacha.profile.name,
		submitted: now - 4.8 * 3600 *1000,
		body: 'Indubitably!'
	});

	for(var i = 0; i<20; i++){
		Posts.insert({
			title: 'Test post #'+(i+1),
			author: sacha.profile.name,
			userId: sacha._id,
			url: 'http://google.com/?q=test-'+(i+1),
			submitted: now-(20-i)*3600*1000,
			commentsCount: 0
		});
	}
}

//deprecated after adding posts with comments
// if (Posts.find().count() === 0) {
// 	Posts.insert({
// 		title: 'Introducing Telescope',
// 		author: 'Sacha Greif',
// 		url: 'http://sachagreif.com/introducing-telescope/'
// 	});
// 	Posts.insert({
// 		title: 'Meteor',
// 		author: 'Tom Coleman',
// 		url: 'http://meteor.com'
// 	});
// 	Posts.insert({
// 		title: 'The Meteor Book',
// 		author: 'Tom Coleman',
// 		url: 'http://themeteorbook.com'
// 	});
// }
