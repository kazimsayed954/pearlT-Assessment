import express from 'express';
import { notification } from '../controllers/notification.controller';
import { validateNotification } from '../validators/notification.validator';

const router = express.Router();
router.post("/",validateNotification,notification);


export default router