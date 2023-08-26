const User = require('../models/user');


module.exports.profile = async function(req, res){
try{

//    if(req.cookies.user_id){
        const user=await User.findById(req.params.id);
    
if(user){

    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
    })
}
   return res.redirect('/users/sign-in')
        

}
catch (error) {
    // Handle errors by logging
    console.error('Error fetching user profile:', error);
}

}

module.exports.update=async function(req, res){
try {
        if(req.user.id==req.params.id){
        const user=await User.findByIdAndUpdate(req.params.id, {name:req.body.name,email:req.body.email})
        if(user){
            return res.redirect('back')
        }
    }else{
        return res.status(401).send('unautherized')
    }
    
} catch (error) {
               console.log('Error updating profile', error);    
}
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            
            return res.redirect('back');
        }

    } catch (error) {
        // Handle the error appropriately
        console.error('An error occurred:', error);
    }
}


// sign in and create a session for the user
module.exports.createSession =function(req, res){
    res.cookie('user_id', req.user._id.toString());
    req.flash('succes', 'Logged in successfully')
      return res.redirect('/');
      
}
module.exports.destroySession = function(req, res){
    // Clear the user_id cookie
    res.clearCookie('user_id');

    // Use req.logout() to log the user out with a callback
    req.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
            return res.redirect('/');
        }
        req.flash('success', 'You have logged out ')
        return res.redirect('/');
    });
}
