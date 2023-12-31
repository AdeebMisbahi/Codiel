const Post=require('../models/post');
const Comment=require('../models/comments')
module.exports.create=async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: 'Post Created'
            })
        }
        req.flash('success', 'Post Published')
        return res.redirect('back');
    }
    catch (err) {
        req.flash('error', error)
       
    }
}

module.exports.destroyed=async function(req, res){
    try {
       
        let post=await Post.findById(req.params.id)
        // .id means converting the object id into string
        if (post.user == req.user.id) {
             post.deleteOne(); // Delete the post
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    messege: "Post Deleted"
                })
            }
           
             Comment.deleteMany({ post: req.params.id }); // Delete associated comments
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