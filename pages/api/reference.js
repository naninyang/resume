import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const references = await prisma.reference.findMany();
      res.status(200).json(references);
    } catch (error) {
      console.error('Failed to fetch references:', error);
      res.status(500).json({ message: 'Failed to fetch references' });
    }
  } else if (req.method === 'POST') {
    try {
      const { github, blog } = req.body;

      const userId = 1;

      const createdReference = await prisma.reference.create({
        data: {
          github,
          blog,
          user: { connect: { id: userId } },
        },
      });

      res.status(200).json(createdReference);
    } catch (error) {
      console.error('Failed to create reference:', error);
      res.status(500).json({ message: 'Failed to create reference' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and POST methods are allowed' });
  }
}
