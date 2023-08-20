const Comment = require("../models/comments");
const Post = require("../models/post");
module.exports.create = async function (req, res) {
  try {
    // Check if the post exists
    const post = await Post.findById(req.body.post);
    if (post) {
      // Create the comment
      const comment = await Comment.create({
        content: req.body.content,
          post:  req.body.post,
          user:  req.user._id,
      });

      post.comments.push(comment);
      post.save();
      res.redirect('back');
    }
  } catch (err) {
    console.error('Error in creating comment:', err);

  }
};
