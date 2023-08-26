const mongoose=require('mongoose');

const commentsSchema=new mongoose.Schema({
    content: {
       type: String,
       require: true,
    },
    // comments belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
})

const Comment=mongoose.model('Comment', commentsSchema);
module.exports=Comment;