const Post=require('../models/post');
const Comment=require('../models/comments')
module.exports.create=async function(req,res){
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        req.flash('success', 'Post Published')
        return res.redirect('back');
    }
    catch (err) {
        req.flash('error', error)
       
    }
}

module.exports.destroyed=async function(req, res){
    try {
       
        const post=await Post.findById(req.params.id)
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await post.deleteOne(); // Delete the post
           
            await Comment.deleteMany({ post: req.params.id }); // Delete associated comments
             req.flash('success','Post and associated comments deleted')
            return res.redirect('back');
        } else {
            req.flash('error','You Cannot delete this post')
            return res.redirect('back');
        }
        
    } catch (error) {
        req.flash('error', error) // Log the error for debugging
    }
}