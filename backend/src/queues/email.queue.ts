// src/queues/emailQueue.ts
import nodemailer from 'nodemailer';
import { Request } from 'express';
import logger from '../logger';
import { MailData } from '../types/maildata.type';
interface QueueItem {
  data: MailData;
  req: Request;
  attempts: number;
}

const emailQueue: QueueItem[] = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || emailQueue.length === 0) return;

  isProcessing = true;

  const queueItem = emailQueue.shift();
  if (queueItem) {
    try {
      await sendMail(queueItem.data, queueItem.req);
      logger.info('Mail sent successfully');
    } catch (error) {
      logger.error('Failed to send mail:', error);

      // Retry logic
      if (queueItem.attempts > 0) {
        queueItem.attempts--;
        emailQueue.push(queueItem);
        logger.info(`Retrying... Attempts left: ${queueItem.attempts}`);
      } else {
        logger.error('Max retry attempts reached. Giving up.');
      }
    }
  }

  isProcessing = false;

  // Process the next item in the queue
  setTimeout(processQueue, 1000);
};

const addToQueue = (data: MailData, req: Request, attempts: number = 5) => {
  emailQueue.push({ data, req, attempts });
  processQueue();
};

const sendMail = (data: MailData, req: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { email } = data;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const senderName = "Pearl Thoughts";
    const mailOptions = {
      from: senderName,
      to: email,
      subject: "Sending Notification Email",
      html: `
      <p>Hii,</p>
      <p>We are sending an Email </p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error('Error sending mail:', err);
        reject(err);
      } else {
        logger.info(`Mail sent to ${email}`);
        resolve();
      }
    });
  });
};

export { addToQueue };
