const nodemailer = require("nodemailer");

// Handle POST requests to /api
export async function POST(req: Request) {
  const ownerEmail = process.env.NEXT_PUBLIC_EMAIL;
  const ownerPassword = process.env.NEXT_PUBLIC_PASS;

  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ownerEmail,
      pass: ownerPassword,
    },
  });

  const mailOptions = {
    from: email,
    to: ownerEmail,
    subject: `New message from ${name} (${email})`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, data: { name, email, message } }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
