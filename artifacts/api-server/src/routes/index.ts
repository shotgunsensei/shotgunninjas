import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import songsRouter from "./songs";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(songsRouter);
router.use(contactRouter);

export default router;
