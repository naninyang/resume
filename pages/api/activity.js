import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const activities = await prisma.activity.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(activities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      res.status(500).json({ message: 'Failed to fetch activities' });
    }
  } else if (req.method === 'PUT') {
    try {
      const activities = req.body;

      const userId = 1;

      for (const activity of activities) {
        const data = { ...activity, user_id: userId };
        if (activity.id) {
          await prisma.activity.update({
            where: { id: activity.id },
            data,
          });
        } else {
          await prisma.activity.create({
            data,
          });
        }
      }

      const updatedData = await prisma.activity.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save activities:', error);
      res.status(500).json({ message: 'Failed to save activities' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
