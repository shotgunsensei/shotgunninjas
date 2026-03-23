import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);

    await db.insert(contactMessagesTable).values({
      name: body.name,
      email: body.email,
      type: body.type,
      message: body.message,
    });

    const result = SubmitContactResponse.parse({
      message: "Message received. We'll be in touch within 24-48 hours.",
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact form");
    res.status(400).json({ message: "Failed to submit message" });
  }
});

export default router;
