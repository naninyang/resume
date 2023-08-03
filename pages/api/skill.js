import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@/components/hooks/envs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const payload = verify(token, JWT_SECRET);
  const userId = payload.id;

  if (req.method === 'GET') {
    try {
      const skills = await prisma.skill.findMany({
        where: {
          userId: userId,
        },
      });

      res.status(200).json(skills);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      res.status(500).json({ message: 'Failed to fetch skills' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
