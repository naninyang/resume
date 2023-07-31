import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const languages = await prisma.language.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(languages);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
      res.status(500).json({ message: 'Failed to fetch languages' });
    }
  } else if (req.method === 'PUT') {
    try {
      const languages = req.body;

      const userId = 1;

      for (const language of languages) {
        const data = { ...language, user_id: userId };
        if (language.id) {
          await prisma.language.update({
            where: { id: language.id },
            data,
          });
        } else {
          await prisma.language.create({
            data,
          });
        }
      }

      const updatedData = await prisma.language.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save languages:', error);
      res.status(500).json({ message: 'Failed to save languages' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
