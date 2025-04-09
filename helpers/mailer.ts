import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export const sendRSVPNotification = async (
  firstName: string,
  lastName: string,
  numberOfGuests: number,
  isComing: boolean
) => {
  const info = await transporter.sendMail({
    from: `"Baby Shower Invite" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER, 
    subject: `New RSVP from ${firstName} ${lastName}`,
    html: `
      <h3>New RSVP Received</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Coming:</strong> ${isComing ? 'Yes' : 'No'}</p>
      <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
    `,
  });

  console.log('Email sent:', info.messageId);
};
