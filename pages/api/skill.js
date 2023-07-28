import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('req: ', req.method)
  if (req.method === 'GET') {
    try {
      const userId = 1;

      const skills = await prisma.skill.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(skills);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      res.status(500).json({ message: 'Failed to fetch skills' });
    }
  } else if (req.method === 'PUT') {
    try {
      const skills = req.body;

      const userId = 1;

      for (const skill of skills) {
        const data = { ...skill, user_id: userId };
        if (skill.id) {
          await prisma.skill.update({
            where: { id: skill.id },
            data,
          });
        } else {
          await prisma.skill.create({
            data,
          });
        }
      }

      const updatedData = await prisma.skill.findMany({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Failed to save skills:', error);
      res.status(500).json({ message: 'Failed to save skills' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
