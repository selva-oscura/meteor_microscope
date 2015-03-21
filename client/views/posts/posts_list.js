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

// Template.postsList.helpers({
// 	posts: function() {
// 		return Posts.find({}, {sort: {submitted: -1}});
// 	}
// });

// animating posts
Template.postsList.rendered = function(){
	this.find('.wrapper')._uihooks = {
		moveElement: function(node, next){
			var $node = $(node);
			var $next = $(next);
			var oldTop = $node.offset().top;
			var height = $(node).outerHeight(true);

			// find all the elements between next and node
			var $inBetween = $(next).nextUntil(node);
			if($inBetween.length ===0){
				$inBetween = $(node).nextUntil(next);
			}

			// now put node in place
			$(node).insertBefore(next);

			// measure new top
			var newTop = $(node).offset().top;

			//move node *back* to where it was before
			$(node)
				.removeClass('animate')
				.css('top', oldTop - newTop);

			// push every other element down/up to put them back
			$inBetween
				.removeClass('animate')
				.css('top', oldTop < newTop ? height: -1 * height);

			// force a redraw
			$(node).offset();

			// reset everything to 0, animated
			$(node).addClass('animate').css('top', 0);
			$inBetween.addClass('animate').css('top', 0);
		}
	}
}