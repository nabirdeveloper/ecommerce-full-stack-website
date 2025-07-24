import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to,
      subject,
      html,
      text,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export function generateWelcomeEmail(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Our E-Commerce Platform!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining our platform. We're excited to have you as part of our community.</p>
      <p>You can now:</p>
      <ul>
        <li>Browse our extensive product catalog</li>
        <li>Add items to your wishlist</li>
        <li>Track your orders</li>
        <li>Manage your profile</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Happy shopping!</p>
      <p>Best regards,<br>The E-Commerce Team</p>
    </div>
  `
}

export function generateOrderConfirmationEmail(orderNumber: string, customerName: string, total: number): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Confirmation</h1>
      <p>Hi ${customerName},</p>
      <p>Thank you for your order! We've received your order and it's being processed.</p>
      <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>Order Details:</h3>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      </div>
      <p>We'll send you another email when your order ships.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>The E-Commerce Team</p>
    </div>
  `
}

export function generatePasswordResetEmail(resetLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Password Reset Request</h1>
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password:</p>
      <div style="margin: 20px 0;">
        <a href="${resetLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The E-Commerce Team</p>
    </div>
  `
}