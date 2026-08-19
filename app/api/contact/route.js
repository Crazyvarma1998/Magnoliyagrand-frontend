const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, maxLength = 500) => String(value ?? "").trim().slice(0, maxLength);
const escapeHtml = (value) => clean(value, 4000)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export async function POST(request) {
  try {
    const body = await request.json();
    const inquiry = {
      name: clean(body.name, 100),
      email: clean(body.email, 180).toLowerCase(),
      phone: clean(body.phone, 40),
      eventType: clean(body.eventType, 100),
      date: clean(body.date, 20),
      guestCount: clean(body.guestCount, 10),
      message: clean(body.message, 3000),
      companyWebsite: clean(body.companyWebsite, 200),
      formStartedAt: Number(body.formStartedAt || 0),
    };

    if (inquiry.companyWebsite) return Response.json({ ok: true });
    if (inquiry.formStartedAt && Date.now() - inquiry.formStartedAt < 2500) {
      return Response.json({ error: "Please take a moment to complete the form." }, { status: 400 });
    }

    const required = ["name", "email", "phone", "eventType", "date", "guestCount", "message"];
    if (required.some((field) => !inquiry[field])) {
      return Response.json({ error: "Please complete every required field." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(inquiry.email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    const guests = Number(inquiry.guestCount);
    if (!Number.isInteger(guests) || guests < 1 || guests > 5000) {
      return Response.json({ error: "Please enter a valid estimated guest count." }, { status: 400 });
    }

    const cmsApiUrl = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL;
    if (cmsApiUrl) {
      await fetch(`${cmsApiUrl.replace(/\/$/, "")}/public/inquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: inquiry.name, email: inquiry.email, phone: inquiry.phone, eventType: inquiry.eventType, preferredDate: inquiry.date, guestCount: guests, message: inquiry.message }),
      }).catch((error) => console.error("CMS inquiry storage failed", error));
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || "sales@magnoliyagrand.com";
    if (!apiKey || !from) {
      return Response.json({ error: "Email delivery is not configured yet. Please call or email our events team." }, { status: 503 });
    }

    const safe = Object.fromEntries(Object.entries(inquiry).map(([key, value]) => [key, escapeHtml(value)]));
    const subject = `New ${inquiry.eventType} inquiry from ${inquiry.name}`;
    const text = [
      "New Magnoliya Grand website inquiry",
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Event type: ${inquiry.eventType}`,
      `Preferred date: ${inquiry.date}`,
      `Estimated guests: ${inquiry.guestCount}`,
      "",
      "Event vision:",
      inquiry.message,
    ].join("\n");
    const html = `
      <div style="font-family:Arial,sans-serif;color:#252b2f;line-height:1.6;max-width:680px;margin:auto">
        <div style="padding:28px 32px;background:#17201d;color:#fff;border-bottom:4px solid #c79b57">
          <p style="margin:0;color:#d9b977;font-size:11px;letter-spacing:2px;text-transform:uppercase">Magnoliya Grand</p>
          <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:34px;font-weight:400">New event inquiry</h1>
        </div>
        <div style="padding:30px 32px;background:#f5f5f1">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:9px 0;color:#707980">Name</td><td style="padding:9px 0"><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:9px 0;color:#707980">Email</td><td style="padding:9px 0"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="padding:9px 0;color:#707980">Phone</td><td style="padding:9px 0">${safe.phone}</td></tr>
            <tr><td style="padding:9px 0;color:#707980">Event type</td><td style="padding:9px 0">${safe.eventType}</td></tr>
            <tr><td style="padding:9px 0;color:#707980">Preferred date</td><td style="padding:9px 0">${safe.date}</td></tr>
            <tr><td style="padding:9px 0;color:#707980">Estimated guests</td><td style="padding:9px 0">${safe.guestCount}</td></tr>
          </table>
          <div style="margin-top:24px;padding:22px;background:#fff;border-left:3px solid #c79b57">
            <p style="margin:0 0 8px;color:#8d6a3b;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Event vision</p>
            <p style="margin:0;white-space:pre-wrap">${safe.message}</p>
          </div>
        </div>
      </div>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "MagnoliyaGrandWebsite/1.0",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({ from, to: [to], reply_to: inquiry.email, subject, html, text }),
    });

    const result = await resendResponse.json();
    if (!resendResponse.ok) {
      console.error("Resend delivery failed", result);
      return Response.json({ error: "Your inquiry could not be delivered. Please call or email our events team." }, { status: 502 });
    }

    return Response.json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Contact inquiry failed", error);
    return Response.json({ error: "Your inquiry could not be sent. Please try again." }, { status: 500 });
  }
}
