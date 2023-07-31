import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      const userId = 1;
      const militaryService = await prisma.military_service.findFirst({
        where: { user_id: userId },
      });
      res.status(200).json(militaryService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch military service' });
    }
  } else if (req.method === 'PUT') {
    try {
      const userId = 1;
      const updatedData = req.body;
      const militaryService = await prisma.military_service.update({
        where: { user_id: userId },
        data: updatedData,
      });
      res.status(200).json(militaryService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update military service' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
