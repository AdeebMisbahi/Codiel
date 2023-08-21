const Post=require('../models/post');
const Comment=require('../models/comments')
module.exports.create=async function(req,res){
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        return res.redirect('back');
    }
    catch (err) {
        console.error('Error in creating post:', err);
       
    }
}

module.exports.destroyed=async function(req, res){
    try {
       
        const post=await Post.findById(req.params.id)
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await post.deleteOne(); // Delete the post
            await Comment.deleteMany({ post: req.params.id }); // Delete associated comments
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.error(error); // Log the error for debugging
    }
}