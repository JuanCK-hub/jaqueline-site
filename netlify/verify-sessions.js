const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sessionId = event.queryStringParameters?.session_id;
    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta session_id" }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: session.id,
        status: session.status,                 // 'complete' o 'open'
        payment_status: session.payment_status, // 'paid' / 'unpaid' / etc.
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
