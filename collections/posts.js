Posts = new Meteor.Collection('posts');  
// no var is used because we want the Posts collection to be available to the whole app
// Code inside folders that are not client/ or server/ will run in both contexts, but the collection does different things within the different envvironments
//on the server, the collection has the job of talking to the Mongo database and writing any changes
// on the client, the collection is a secure copy of a subset of the real, canonical collection; the client-side collection constantly and (mostly) transparently is kept up-to-date with that subset in real-time

Posts.allow({
	insert: function(userId, doc){
		// only allow posting if user is logged in
		return !! userId;
	}
});