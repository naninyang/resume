import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const certificateId = req.query.certificateId;
    try {
      await prisma.certificate.delete({
        where: { id: Number(certificateId) },
      });
      res.status(200).json({ message: 'Deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the certificate.' });
    }
  } else {
    res.status(405).send({ message: 'Only GET and PUT methods are allowed' });
  }
}
