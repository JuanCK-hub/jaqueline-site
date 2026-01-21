const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session_id =
      event.queryStringParameters?.session_id ||
      event.queryStringParameters?.sessionId;

    if (!session_id) {
      return {
        statusCode: 400,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ error: "Falta session_id" }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        id: session.id,
        payment_status: session.payment_status, // "paid" | "unpaid" | "no_payment_required"
        status: session.status, // "complete" etc (depende)
        customer_email: session.customer_details?.email || session.customer_email || null,
      }),
    };
  } catch (err) {
    return { statusCode: 500, headers: {"Content-Type": "application/json"}, body: JSON.stringify({ error: err.message }) };
  }
};
