import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.LEADS_TABLE;

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

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(200, { ok: true });
  }

  try {
    const payload = JSON.parse(event.body ?? "{}");
    const { name, email, company, message } = payload;

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
      createdAt: new Date().toISOString()
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    return response(201, { message: "Lead captured successfully." });
  } catch (error) {
    console.error("lead-capture-error", error);
    return response(500, { message: "Internal server error." });
  }
};

