import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import songsRouter from "./songs";
import contactRouter from "./contact";
import authRouter from "./auth";
import clanRouter from "./clan";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(songsRouter);
router.use(contactRouter);
router.use(authRouter);
router.use(clanRouter);

export default router;
