import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('req: ', req.method)
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const educations = await prisma.education.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(educations);
    } catch (error) {
      console.error('Failed to fetch educations:', error);
      res.status(500).json({ message: 'Failed to fetch educations' });
    }
  } else if (req.method === 'PUT') {
    try {
      const educations = req.body;

      const userId = 1;

      for (const education of educations) {
        const data = { ...education, user_id: userId };
        if (education.id) {
          await prisma.education.update({
            where: { id: education.id },
            data,
          });
        } else {
          await prisma.education.create({
            data,
          });
        }
      }

      const updatedData = await prisma.education.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save educations:', error);
      res.status(500).json({ message: 'Failed to save educations' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
