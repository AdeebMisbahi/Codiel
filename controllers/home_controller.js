const Post = require('../models/post');

module.exports.home = function(req, res){
    
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec()
    .then(posts=>{
            return res.render('home', {
        title: "Home",
        posts:posts

    });
    })


}

// module.exports.actionName = function(req, res){}