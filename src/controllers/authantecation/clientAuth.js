import { CLIENT } from '../../models/clientModel.js';
import { transporter } from '../../utils/mailTransport.js';
import { generateToken, comparePassword, hashPassword } from '../../utils';



export const signup = async (req, res) => {
  try {
    const User = await CLIENT.findOne({ email: req.body.email });

    if (User) {
      return res.status(409).json({
        message: 'User with this email already exists',
      });
    }
    //check password and confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(409).json({
        message: 'password and confirm-Password not match',
      });
    }

    const hashedPassword = await hashPassword(req.body.password);

    req.body.password = hashedPassword;

    const newUser = await CLIENT.create(req.body);
    if (!newUser) {
      res.status(404).json({ message: 'Failed to register' });
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
      CLIENT: {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        phone: newUser.phone,
        date: newUser.date,
        role: newUser.role,
      },
    });
    
  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

export const login = async (req, res) => {
  try {
    const User = await CLIENT.findOne({ email: req.body.email });

    if (!User) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      User.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const token = generateToken({
      id: User.id,
      // email: User.email,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      access_token: token,
      CLIENT: {
        email: User.email,
        name: User.name,
        password: User.password,
        role: User.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const forgotPassword = async (req, res) => {
   try {
     const { email } = req.body;
     

   } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
   }
  }

  export const changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const { userId } = req;
      const User = await CLIENT.findById(userId);
      const isPasswordCorrect = comparePassword(currentPassword, User.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: 'Wrong password',
        });
      }
  
      const hashedPassword = await hashPassword(newPassword);
      User.password = hashedPassword;
      User.save();
      res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  };


  //user after login he must complete his profile by providing missing info according to client model because isVerified is false by default after provide those info, isVerified became true
  export const verifyProfile = async (req, res) => {
    try {
      const { userId } = req;
      const User = await CLIENT.findById(userId);
      if (!User) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      User.photo = req.body.photo;
      User.nationalID = req.body.nationalID;
      User.country = req.body.country;
      User.city = req.body.city;
      User.district = req.body.district;
      User.sector = req.body.sector;
      User.cell = req.body.cell;
      User.isVerified = true;
      User.save();
      res.status(200).json({
        message: 'Profile verified successfully',
      });   
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
  