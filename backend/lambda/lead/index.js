import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});

const TABLE_NAME = process.env.LEADS_TABLE;
const FROM_EMAIL = process.env.FROM_EMAIL;
const DEFAULT_RECIPIENT = process.env.RECIPIENT_EMAIL ?? "info@theiconicstones.com";

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST"
  },
  body: JSON.stringify(body)
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildEmailBodies = (item) => {
  const textBody = [
    "New inquiry — Iconic Stones website",
    "",
    `Name: ${item.name}`,
    `Email: ${item.email}`,
    `Company: ${item.company}`,
    "",
    item.message,
    "",
    `Lead ID: ${item.leadId}`,
    `Submitted: ${item.createdAt}`
  ].join("\n");

  const htmlBody = `
    <div style="font-family:Georgia,serif;color:#4a443f;line-height:1.6;max-width:640px">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#a79320;margin:0 0 1rem">
        New inquiry — Iconic Stones
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:6px 0;color:#888;width:120px">Name</td><td>${escapeHtml(item.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#888">Company</td><td>${escapeHtml(item.company)}</td></tr>
      </table>
      <p style="margin:1.5rem 0 0.5rem;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a79320">Message</p>
      <pre style="white-space:pre-wrap;font-family:Georgia,serif;font-size:14px;margin:0;padding:1rem;background:#f9f5f0;border:1px solid #e3dbd2">${escapeHtml(item.message)}</pre>
      <p style="margin:1.5rem 0 0;font-size:11px;color:#999">Lead ID: ${escapeHtml(item.leadId)} · ${escapeHtml(item.createdAt)}</p>
    </div>
  `.trim();

  return { textBody, htmlBody };
};

const sendLeadEmail = async (item) => {
  if (!FROM_EMAIL) {
    throw new Error("FROM_EMAIL is not configured.");
  }

  const { textBody, htmlBody } = buildEmailBodies(item);

  await ses.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [item.recipientEmail] },
      ReplyToAddresses: [item.email],
      Message: {
        Subject: {
          Data: `New B2B inquiry from ${item.name} — Iconic Stones`,
          Charset: "UTF-8"
        },
        Body: {
          Text: { Data: textBody, Charset: "UTF-8" },
          Html: { Data: htmlBody, Charset: "UTF-8" }
        }
      }
    })
  );
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(200, { ok: true });
  }

  try {
    const payload = JSON.parse(event.body ?? "{}");
    const { name, email, company, message, recipientEmail } = payload;

    if (!name || !email || !company || !message) {
      return response(400, { message: "name, email, company, and message are required." });
    }
    if (!isValidEmail(email)) {
      return response(400, { message: "Invalid email format." });
    }

    const item = {
      leadId: crypto.randomUUID(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: String(company).trim(),
      message: String(message).trim(),
      recipientEmail: recipientEmail ? String(recipientEmail).trim().toLowerCase() : DEFAULT_RECIPIENT,
      createdAt: new Date().toISOString()
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    await sendLeadEmail(item);

    return response(201, { message: "Lead captured successfully." });
  } catch (error) {
    console.error("lead-capture-error", error);
    return response(500, { message: "Internal server error." });
  }
};
