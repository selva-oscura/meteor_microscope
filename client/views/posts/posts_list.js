//original hard-coding of data
// var postsData = [
// 	{
// 		title:'Introducing Telescope',
// 		author:'Sacha Greif',
// 		url:'http://sachagreif.com/introducing-telescope'
// 	},
// 	{
// 		title:'Meteor',
// 		author:'Tom Coleman',
// 		url:'http://meteor.com'
// 	},
// 	{
// 		title:'The Meteor Book',
// 		author:'Tom Coleman',
// 		url:'http://themeteorbook.com'
// 	}
// ];
// the following helper ties the above postsData to the posts template in posts_list.html, allowing the template to iterate through the above data
// Template.postsList.helpers({
// 	posts: postsData
// });

Template.postsList.helpers({
	posts: function() {
		return Posts.find();
	}
});