module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', '617c8f3c8f3006c2ac18ef9b');
    return res.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}