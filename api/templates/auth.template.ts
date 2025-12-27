// Welcome Email Template
export const getWelcomeEmail = (userName: string, userEmail: string) => {
  return {
    subject: `Welcome to [Your Company Name]! 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome Aboard! 🚀</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>We're thrilled to have you join our community! Your account has been successfully created.</p>
            
            <p><strong>Account Details:</strong></p>
            <ul>
              <li>Email: ${userEmail}</li>
              <li>Registration Date: ${new Date().toLocaleDateString()}</li>
            </ul>
            
            <p>Here's what you can do next:</p>
            <ul>
              <li>Complete your profile</li>
              <li>Explore our features</li>
              <li>Connect with other users</li>
            </ul>
            
            <a href="https://yourapp.com/dashboard" class="button">Get Started</a>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The [Your Company] Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p>You received this email because you signed up for an account.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to [Your Company Name]!
      
      Hi ${userName},
      
      We're thrilled to have you join our community! Your account has been successfully created.
      
      Account Details:
      - Email: ${userEmail}
      - Registration Date: ${new Date().toLocaleDateString()}
      
      Get started: https://yourapp.com/dashboard
      
      Best regards,
      The [Your Company] Team
    `
  };
}

// Verification Email Template
export const getVerificationEmail = (userName: string, userEmail: string, otp: string, expiryMinutes: number) => {
  return {
    subject: 'Verify Your Email Address',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Verify Your Email</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
            
            <div class="otp-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Your verification code is:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This code expires in ${expiryMinutes} minutes</p>
            </div>
            
            <p>Enter this code on the verification page to activate your account.</p>
            
            <a href="https://yourapp.com/verify?email=${encodeURIComponent(userEmail)}" class="button">Verify Email</a>
            
            <div class="warning">
              <strong>⚠️ Security Note:</strong> Never share this code with anyone. Our team will never ask for your verification code.
            </div>
            
            <p>If you didn't request this verification, please ignore this email or contact our support team.</p>
            
            <p>Best regards,<br>The [Your Company] Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Verify Your Email Address
      
      Hi ${userName},
      
      Thank you for signing up! Please verify your email address to complete your registration.
      
      Your verification code is: ${otp}
      
      This code expires in ${expiryMinutes} minutes.
      
      Verify your email: https://yourapp.com/verify?email=${encodeURIComponent(userEmail)}
      
      Security Note: Never share this code with anyone.
      
      If you didn't request this verification, please ignore this email.
      
      Best regards,
      The [Your Company] Team
    `
  };
}