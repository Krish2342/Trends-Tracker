import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit, verifyAuth, unauthorizedResponse, sanitizeInput, isValidEmail, limitLength } from '@/lib/security';

export async function POST(request: Request) {
  // 1. Rate limiting — max 30 requests/minute per IP
  const rateLimited = checkRateLimit(request)
  if (rateLimited) return rateLimited

  // 2. Auth check — only logged-in users can send contact forms
  const user = await verifyAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 4. Sanitize all inputs to prevent XSS / HTML injection
    const safeName = sanitizeInput(limitLength(name, 100))
    const safeEmail = sanitizeInput(limitLength(email, 254))
    const safeSubject = sanitizeInput(limitLength(subject, 200))
    const safeMessage = sanitizeInput(limitLength(message, 5000))

    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'pkrish2304@gmail.com', // Sender email
        pass: process.env.EMAIL_PASSWORD, // App password from Google
      },
    });

    // Setup email data — all user inputs are sanitized
    const mailOptions = {
      from: `"${safeName}" <${process.env.EMAIL_USER || 'pkrish2304@gmail.com'}>`, // Uses sanitized name
      replyTo: safeEmail,
      to: 'pkrish2304@gmail.com', // Send TO this address
      subject: `New Support Ticket: ${safeSubject}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nSubject: ${safeSubject}\n\nMessage:\n${safeMessage}`,
      html: `
        <h3>New Support Ticket from TrendsTracker</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

