const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try {
        const posts = await Post.find({}) 
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        const users = await User.find({});
        
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.error("Error in home controller", err);
        // Handle the error appropriately, e.g., by sending an error response
        return res.status(500).send("Internal Server Error");
    }
};


// module.exports.actionName = function(req, res){}