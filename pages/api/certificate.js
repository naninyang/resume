import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const certificates = await prisma.certificate.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(certificates);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
      res.status(500).json({ message: 'Failed to fetch certificates' });
    }
  } else if (req.method === 'PUT') {
    try {
      const certificates = req.body;

      const userId = 1;

      for (const certificate of certificates) {
        const data = { ...certificate, user_id: userId };
        if (certificate.id) {
          await prisma.certificate.update({
            where: { id: certificate.id },
            data,
          });
        } else {
          await prisma.certificate.create({
            data,
          });
        }
      }

      const updatedData = await prisma.certificate.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save certificates:', error);
      res.status(500).json({ message: 'Failed to save certificates' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
