import { Resend } from "resend";

interface ResendCredentials {
  apiKey: string;
  fromEmail: string;
}

let cachedCredentials: ResendCredentials | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchResendCredentials(): Promise<ResendCredentials> {
  const now = Date.now();
  if (cachedCredentials && now - cachedAt < CACHE_TTL_MS) {
    return cachedCredentials;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      "Resend credentials unavailable: missing REPLIT_CONNECTORS_HOSTNAME or repl/depl identity",
    );
  }

  const res = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=resend`,
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Resend connection: ${res.status}`);
  }

  const data = (await res.json()) as {
    items?: Array<{ settings?: { api_key?: string; from_email?: string } }>;
  };
  const item = data.items?.[0];
  if (!item?.settings?.api_key || !item.settings.from_email) {
    throw new Error("Resend not connected or missing api_key/from_email");
  }

  cachedCredentials = {
    apiKey: item.settings.api_key,
    fromEmail: item.settings.from_email,
  };
  cachedAt = now;
  return cachedCredentials;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<{ id: string | null }> {
  const creds = await fetchResendCredentials();
  const client = new Resend(creds.apiKey);
  const { data, error } = await client.emails.send({
    from: input.from ?? creds.fromEmail,
    to: input.to,
    subject: input.subject,
    html: input.html,
    replyTo: input.replyTo,
  });
  if (error) {
    throw new Error(error.message ?? "Failed to send email");
  }
  return { id: data?.id ?? null };
}

export async function getResendFromEmail(): Promise<string> {
  const creds = await fetchResendCredentials();
  return creds.fromEmail;
}
