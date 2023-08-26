const Comment = require("../models/comments");
const Post = require("../models/post");
const { post } = require("../routes/posts");
module.exports.create = async function (req, res) {
  try {
    // Check if the post exists
    const post = await Post.findById(req.body.post);
    if (post) {
      // Create the comment
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();
      res.redirect("back");
    }
  } catch (err) {
    console.error("Error in creating comment:", err);
  }
};
module.exports.destroy = async function (req, res) {
  try {

    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.deleteOne();
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).then((post) => {
        return res.redirect('back');
      });

    }
    else{
      return res.redirect('back');
    }
  } catch (error) {
    console.log('Eroor in deleting comment', error);
  }
};
