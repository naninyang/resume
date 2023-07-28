import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const skillId = req.query.skillId;
    try {
      await prisma.skill.delete({
        where: { id: Number(skillId) },
      });
      res.status(200).json({ message: 'Deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the skill.' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
