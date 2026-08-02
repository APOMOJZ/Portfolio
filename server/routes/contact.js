/*
  =============================================
  📚 LESSON: Express Routing & Nodemailer (Contact Route)
  =============================================
  
  In Express, a ROUTER organizes related URL endpoints.
  This file handles all requests that go to '/api/contact'.
  
  KEY CONCEPTS:
  1. POST Request: Used to send data to the server (like form entries)
  2. Nodemailer: A Node.js library that lets us send emails.
  3. SMTP Transport: The connection protocol to send email (we use Gmail SMTP).
  4. HTTP Status Codes:
     - 201 Created: Data successfully saved/processed
     - 400 Bad Request: Missing or invalid input data
     - 500 Internal Server Error: Server error (e.g. database down, email failed)
*/

import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST api/contact
// @desc    Submit contact form, save to DB, and send notification email
// @access  Public (anyone can submit the contact form)
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Simple validation: check if all fields exist
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all fields' 
    });
  }

  try {
    // 2. Save the message to our MongoDB database
    // Contact.create is a Mongoose method that creates a new document and saves it
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // 3. Configure Nodemailer to send notification emails
    // We create a "transporter" which is the email sender.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (stored in .env)
        pass: process.env.EMAIL_PASS  // Your Gmail App Password (stored in .env)
      }
    });

    // 4. Set up email details
    // We send an email to ourselves (Priyanshu) to notify of a new message.
    const emailOptions = {
      from: `"${name}" <${email}>`, // Show sender's name and email in inbox
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Send to your own email address
      subject: `💼 Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #7c3aed; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #7c3aed; margin-bottom: 20px;">New Message from Portfolio Website!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #7c3aed; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </p>
        </div>
      `
    };

    // 5. Send the email!
    // We wrap this in a conditional so that if email setup is not completed yet,
    // the application still succeeds saving to the database.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(emailOptions);
      
      // OPTIONAL: Send a nice auto-reply to the user confirming receipt
      const autoReplyOptions = {
        from: `"Priyanshu" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for contacting me!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ec4899; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #ec4899;">Hey ${name}! 👋</h2>
            <p>Thanks for reaching out through my portfolio website.</p>
            <p>I have received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
            <br />
            <p>Best regards,</p>
            <p><strong>Priyanshu</strong></p>
            <p style="color: #888; font-size: 0.8rem;">This is an automated response confirming I received your message.</p>
          </div>
        `
      };
      await transporter.sendMail(autoReplyOptions);
    }

    // 6. Return success response to the React frontend
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newContact
    });

  } catch (error) {
    console.error(`🔴 CONTACT ROUTE ERROR: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error. Failed to save message or send email.'
    });
  }
});

export default router;
