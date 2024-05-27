import { io } from ".."
import { Request, Response } from 'express';
import logger from "../logger";
import { addToQueue } from "../queues/email.queue";

export const notification = async (req: Request, res: Response) => {
    try {
        const notificationData = req.body;
        io.emit('notification', notificationData);

        addToQueue(notificationData, req);
        logger.info('Notification queued successfully');
        res.status(200).send('Notification queued successfully');
    } catch (error) {
        logger.error('Notification Controller Error', error);
        res.status(500).send('Failed to queue notification');
    }
}