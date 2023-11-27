import { ADMIN } from '../../models'
import { transporter } from '../../utils/mailTransport.js';
import { generateToken, comparePassword, hashPassword } from '../../utils';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

// Signup for both individual and organization clients
export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, userType } = req.body;

    // Check if the email already exists
    const existingUser = await ADMIN.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exists',
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(409).json({
        message: 'Password and Confirm Password do not match',
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user based on userType
    let newUser;
    if (userType === 'admin') {
      const { name, phone,userType,category} = req.body;
      newUser = await ADMIN.create({
        email,
        password: hashedPassword, 
        name,
        category,
        userType,
        phone,
        
      });
    } else {
      return res.status(400).json({
        message: 'Invalid user type',
      });
    }

    // Send a welcome email to the user
    const mailOptions = {
      from: 'robertwilly668@gmail.com',
      to: newUser.email,
      subject: 'Welcome to LAWYER site',
      text: 'Thank you for signing up!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    const token = generateToken({
      id: newUser.id,
    });

    res.status(201).json({
      message: 'User registered successfully',
      access_token: token,
      ADMIN: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        // Add other relevant fields based on userType
      },
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
//##################################################################################
// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await ADMIN.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const token = generateToken({
      id: user.id,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      access_token: token,
      ADMIN: {
        email: user.email,
        name: user.name,
        role: user.role,
        // Add other relevant fields based on userType
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
//#######################################################
// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email, useOtp } = req.body;
    const user = await ADMIN.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: `User not found ${user}`,
      });
    }

    // Generate a unique reset token or OTP based on user's choice
    const resetToken = useOtp ? generateOtp() : crypto.randomBytes(20).toString('hex');

    // Save the reset token and expiry time in the user's document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + (useOtp ? 600000 : 3600000); // OTP expires in 10 minutes, email token in 1 hour

    await user.save();

    // Send an email or OTP to the user based on the choice
    if (useOtp) {
      // Send OTP via SMS or other means
      sendOtp(user.phone, resetToken); // You need to implement the sendOtp function
    } else {
      // Send an email to the user with the reset link
      const mailOptions = {
        from: 'robertwilly668@gmail.com',
        to: user.email,
        subject: 'Reset your password',
        text: `Hi ${user.name} \n 
          Please click on the following link ${process.env.CLIENT_URL}/reset-password/${resetToken} to reset your password. \n\n 
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending failed:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(200).json({
      message: 'Reset link/OTP sent to the registered email/phone number',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

//############################################################################

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await ADMIN.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid or expired reset token',
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// Helper function to generate OTP
function generateOtp() {
  // Implement your OTP generation logic (e.g., random 6-digit number)
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to send OTP (implement based on your application)
function sendOtp(phone, otp) {
  // Implement your OTP sending logic (e.g., send OTP via SMS)
  console.log(`Your OTP is ${otp}`);


}

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req;
    const user = await ADMIN.findById(userId);

    const isPasswordCorrect = await comparePassword(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// Verify Client and Complete Profile
export const verifyClientAndCompleteProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await ADMIN.findById(userId);
    // Check if the user is not yet verified
    const userType = user.userType;
    
    if (!user.isVerified) {
      if (userType === 'individual') {
      // Update the user object with the provided form data
      const { name,phone, country, city, district, sector, cell, 
        nationalID } = req.body;

      user.name = name || user.name;
      user.country = country || user.country;
      user.city = city || user.city;
      user.district = district || user.district;
      user.sector = sector || user.sector;
      user.cell = cell || user.cell;
      user.nationalID = nationalID || user.nationalID;
      user.phone = phone || user.phone;
    
      // Check for file upload
      if (req.files && req.files['photo'] && req.files['photo'][0]) {
        // Upload the photo to Cloudinary
        const result = await cloudinary.uploader.upload(req.files['photo'][0].path);

        // Update the user's photo URL with the Cloudinary URL
        user.photo = result.secure_url;
      }
      else if (req.files && req.files['documents'] && req.files['documents'][0]) {
        // Upload the document to Cloudinary
        const result = await cloudinary.uploader.upload(req.files['documents'][0].path);

        // Update the user's document URL with the Cloudinary URL
        user.documents = result.secure_url;
      }
    } else if (userType === 'organization') {
      // Update the user object with the provided form data
      const {name,registrationNumber,
         phone, country, city, district, sector, cell, contactPerson } = req.body;

      
      user.name = name || user.name;
      user.registrationNumber = registrationNumber || user.registrationNumber;
      user.contactPerson = contactPerson || user.contactPerson;
      user.country = country || user.country;
      user.city = city || user.city;
      user.district = district || user.district;
      user.sector = sector || user.sector;
      user.cell = cell || user.cell;
   
      user.phone = phone || user.phone;
    
      // Check for file upload
      if (req.files && req.files['photo'] && req.files['photo'][0]) {
        // Upload the photo to Cloudinary
        const result = await cloudinary.uploader.upload(req.files['photo'][0].path);

        // Update the user's photo URL with the Cloudinary URL
        user.photo = result.secure_url;
      }
            else if (req.files && req.files['documents'] && req.files['documents'][0]) {
        // Upload the document to Cloudinary
        const result = await cloudinary.uploader.upload(req.files['documents'][0].path);

        // Update the user's document URL with the Cloudinary URL
        user.documents = result.secure_url;
      }
    } else if (userType === 'lawyer') {
        // Update the user object with the provided form data
        const {name,nationalID,phone, country, city, district, sector, cell, category } = req.body;
       
        user.name = name || user.name;
        user.nationalID = nationalID || user.nationalID;
        user.category = category || user.category;
        user.country = country || user.country;
        user.city = city || user.city;
        user.district = district || user.district;
        user.sector = sector || user.sector;
        user.cell = cell || user.cell;
     
        user.phone = phone || user.phone;
      
        // Check for file upload
        if (req.files && req.files['photo'] && req.files['photo'][0]) {
          // Upload the photo to Cloudinary
          const result = await cloudinary.uploader.upload(req.files['photo'][0].path);
  
          // Update the user's photo URL with the Cloudinary URL
          user.photo = result.secure_url;
        }
       else if (req.files && req.files['documents'] && req.files['documents'][0]) {
            // Upload the document to Cloudinary
            const result = await cloudinary.uploader.upload(req.files['documents'][0].path);
    
            // Update the user's document URL with the Cloudinary URL
            user.documents = result.secure_url;
          }
      }
      else if (userType === 'admin') {
        // Update the user object with the provided form data
        const {name,nationalID,phone, country, city, district, sector, cell, category } = req.body;
       
        user.name = name || user.name;
        user.nationalID = nationalID || user.nationalID;
        user.category = category || user.category;
        user.country = country || user.country;
        user.city = city || user.city;
        user.district = district || user.district;
        user.sector = sector || user.sector;
        user.cell = cell || user.cell;
     
        user.phone = phone || user.phone;
      
        // Check for file upload
        if (req.files && req.files['photo'] && req.files['photo'][0]) {
          // Upload the photo to Cloudinary
          const result = await cloudinary.uploader.upload(req.files['photo'][0].path);
  
          // Update the user's photo URL with the Cloudinary URL
          user.photo = result.secure_url;
        }
       else if (req.files && req.files['documents'] && req.files['documents'][0]) {
            // Upload the document to Cloudinary
            const result = await cloudinary.uploader.upload(req.files['documents'][0].path);
    
            // Update the user's document URL with the Cloudinary URL
            user.documents = result.secure_url;
          }
      }
      // Mark the user as verified
      user.isVerified = true;
      await user.save();
    }

    return res.status(200).json({
      message: 'User is verified',
    });
  } catch (error) {
    console.error('Error in verifyClientAndCompleteProfile:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// Get All Clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await ADMIN.find();
    res.status(200).json({
      message: 'All Admins',
      clients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

