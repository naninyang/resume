import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JWT_SECRET } from '@/components/hooks/envs';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  try {
    const payload = verify(token, JWT_SECRET);
    const userId = payload.id;

    const prisma = new PrismaClient();
    const careers = await prisma.career.findMany({
      where: { userId },
      include: { projects: true },
    });

    res.json(careers);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};
