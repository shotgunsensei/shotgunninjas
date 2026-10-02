import { afterEach, expect, vi } from "vitest";
import { sendEmail, getResendFromEmail } from "../lib/mailer";

// Never resolve connector credentials or send mail from this suite.
vi.mock("../lib/mailer", () => ({
  sendEmail: vi.fn(() => {
    throw new Error("Mail disabled in API tests");
  }),
  getResendFromEmail: vi.fn(() => {
    throw new Error("Mail disabled in API tests");
  }),
}));

afterEach(() => {
  expect(sendEmail).not.toHaveBeenCalled();
  expect(getResendFromEmail).not.toHaveBeenCalled();
});
