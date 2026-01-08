'use server'

export type ContactFormState = {
  success: boolean
  message: string
} | null

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const subject = formData.get('subject')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  // Validate required fields
  if (!name || !email || !message) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    }
  }

  // Message length validation
  if (message.length < 10) {
    return {
      success: false,
      message: 'Please enter a longer message (at least 10 characters).',
    }
  }

  if (message.length > 5000) {
    return {
      success: false,
      message: 'Message is too long (maximum 5000 characters).',
    }
  }

  // In a real application, you would:
  // - Send an email using a service like Resend, SendGrid, or Nodemailer
  // - Store the submission in a database
  // - Integrate with a CRM or help desk system
  //
  // For now, we'll log the submission and return success
  console.log('Contact form submission:', { name, email, subject, message })

  return {
    success: true,
    message: "Thanks for reaching out! We'll get back to you within a day or two.",
  }
}
