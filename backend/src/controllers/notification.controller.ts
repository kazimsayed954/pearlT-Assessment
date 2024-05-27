import { io } from ".."
import { Request, Response } from 'express';
import logger from "../logger";
import { addToQueue } from "../queues/email.queue";

export const notification = async (req: Request, res: Response) => {
    try {
        const body= req.body;
        const { email, message} = body;
        io.emit('notification', {
            email,
            message
        });

        addToQueue(body, req);
        logger.info('Notification queued successfully');
        res.status(200).send('Notification queued successfully');
    } catch (error) {
        logger.error('Notification Controller Error', error);
        res.status(500).send('Failed to queue notification');
    }
}