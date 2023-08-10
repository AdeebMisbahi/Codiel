const User = require('../models/user');


module.exports.profile = async function(req, res){
   if(req.cookies.user_id){
   
        const user=await User.findById(req.cookies.user_id);
if(user){
    return res.render('user_profile', {
        title:"user profile",
        user: user,
    })
}
   return res.redirect('/users/sign-in')
        
}else{
    return res.redirect('/users/sign-in')
}

}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
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
module.exports.createSession =async function(req, res){
    // steps to authenticate
    // find the user
    // handle user found
    // handle user which dosn't match
    // handle session creation
    // handle user not found
    try {
        const { email, password } = req.body;
        console.log('Email:', email); // Add this line for debugging

        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            // Handle user found
            if (user.password === password) {
                // Create a session or set authentication flag as needed
                // For the sake of example, let's set a session variable
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile'); // Redirect to the dashboard 
            } else {
                // Handle incorrect password
                return res.redirect('/users/sign-in');
            }
        } else {
            // Handle user not found
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        // Handle the error appropriately
        console.error('An error occurred:', error);
    }

}