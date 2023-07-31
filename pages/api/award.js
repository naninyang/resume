import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const awards = await prisma.award.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(awards);
    } catch (error) {
      console.error('Failed to fetch awards:', error);
      res.status(500).json({ message: 'Failed to fetch awards' });
    }
  } else if (req.method === 'PUT') {
    try {
      const awards = req.body;

      const userId = 1;

      for (const award of awards) {
        const data = { ...award, user_id: userId };
        if (award.id) {
          await prisma.award.update({
            where: { id: award.id },
            data,
          });
        } else {
          await prisma.award.create({
            data,
          });
        }
      }

      const updatedData = await prisma.award.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save awards:', error);
      res.status(500).json({ message: 'Failed to save awards' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
