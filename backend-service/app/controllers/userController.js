const bcrypt = require('bcryptjs');
const User = require('../models/users.js'); 
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists',success:false,duplicate:true });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            userName: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            fromGoogle: false,
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        console.log("User Exists");

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (user && isPasswordCorrect) {
            res.status(200).json({ result: user, message: 'User found successfully!' });
        }


    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

const googleSignUp = async (req, res) => {
    const token = req?.headers?.authorization;
    if(token){
        const googleToken = token.split(' ')[1];
        try {
            const decoded = jwt.decode(googleToken);
            if(decoded?.email_verified){
                const email = decoded?.email;
                const fname = decoded?.given_name;
                const lname = decoded?.family_name;
                const picture = decoded?.picture;
                try{
                    const isUser = await User.findOne({email:email});             
                if(!isUser){
                    const user = new User({
                        userName: `${fname} ${lname}`,
                        email,
                        fromGoogle: true,
                        profileImage: picture
                    });
                    try{
                    const created = await user.save();
                    res.status(200).json({ message: 'User created successfully!',data:created});
                    }
                    catch(err){
                        res.send({
                            status:200,
                            message:"Unable to save user"
                        })
                    }  
                }
                else{
                    res.send({
                        status:200,
                        message:"User Found",
                        data:isUser,
                        success:true
                    })
                }
            }
                catch(err){
                    console.log("Error with matching email in DB",err);
                    res.send({
                        status:500,
                        message:"Error with matching email in DB",
                        success:false
                    })
                }
            }
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.send({
                status:500,
                message:"Error decoding JWT token",
                success:false
            })
        }
    }
    else{
        res.send({
            status:200,
            message:"No Token Found",
            success:false
        })
    }
}


const saveRoute = async (req, res) => {
    try {
        const { email, srcCoordinates, destCoordinates, blockIceCaps, allowPanama, allowSuez } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const savedLocation = {
            srcCoordinates: srcCoordinates,
            destCoordinates: destCoordinates,
            blockIceCaps: blockIceCaps,
            allowPanama: allowPanama,
            allowSuez: allowSuez
        };

        user.savedLocation.push(savedLocation);
        
        const updatedUser = await user.save();

        console.log(updatedUser);
        res.status(200).json({ result: updatedUser, message: 'User Routes Updated successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

module.exports = {
    signUp,
    login,
    googleSignUp,
    saveRoute,
};
