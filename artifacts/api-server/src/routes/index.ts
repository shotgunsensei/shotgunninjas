import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import songsRouter from "./songs";
import repositoryRouter from "./repository";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import authRouter from "./auth";
import clanRouter from "./clan";
import adminRouter from "./admin";
import trackRouter from "./track";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(songsRouter);
router.use(repositoryRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(authRouter);
router.use(clanRouter);
router.use(adminRouter);
router.use(trackRouter);

export default router;
