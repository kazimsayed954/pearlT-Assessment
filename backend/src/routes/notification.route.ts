import express from 'express';
import { notification } from '../controllers/notification.controller';

const router = express.Router();
router.post("/",notification);


export default router