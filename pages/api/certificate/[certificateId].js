import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@/components/hooks/envs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const certificateId = req.query.certificateId;

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const payload = verify(token, JWT_SECRET);
  const userId = payload.id;

  switch (req.method) {
    case 'PUT':
      try {
        const updatedCertificate = await prisma.certificate.update({
          where: { id: req.body.id },
          data: {
            certificate_name: req.body.certificate_name,
            organization: req.body.organization,
            certificate_num: req.body.certificate_num,
            issue_date: req.body.issue_date,
            userId: userId,
          },
        });
        res.status(200).json(updatedCertificate);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the certificate.' });
      }
      break;

    case 'POST':
      try {
        const createdCertificate = await prisma.certificate.create({
          data: {
            ...req.body,
            userId: userId
          },
        });
        res.status(201).json(createdCertificate);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create the certificate.' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.certificate.delete({
          where: { id: Number(certificateId) },
        });
        res.status(200).json({ message: 'Deleted successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the certificate.' });
      }
      break;

    default:
      res.status(405).send({ message: 'Method not allowed' });
      break;
  }
}
