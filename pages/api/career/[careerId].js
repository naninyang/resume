import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const careerId = req.query.careerId;

  if (req.method === 'DELETE') {
    try {
      await prisma.career.delete({
        where: { id: Number(careerId) },
      });

      res.status(200).json({ message: 'Deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the career.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
