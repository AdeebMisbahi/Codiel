{
  
 let creatPost=function(){
   let newPostForm= $('#new-post-form');
   
   newPostForm.submit(function(e){
    e.preventDefault()
    $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
            console.log(data.data.post)
           let newPost=newPostDom(data.data.post);
           $('#posts-list-container > ul').prepend(newPost);
           deletePost($(' .delete-post-button', newPost));
         
        },
        error: function(error){
            console.log(error.responseText);
        }
    });

   })
 }
 let newPostDom=function(post){
    return $(`
    <li id="post-${post._id}">
    <p>
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
       

        ${post.content}
        <br>
        <small>
            ${post.user.name}    
        </small>
    </p>
    <div id="post-comment">
       
        <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="add comments..." required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="add comment">
        </form>
        
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
    </div>
</li>
    `)

 }

//  method to delete a post
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: "get",
            url: $(deleteLink).prop('href'),
            success: function (data) {
                console.log(data);
             $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error){
                console.log(error.responseText);
            }
        });

    })
}

 creatPost()
}