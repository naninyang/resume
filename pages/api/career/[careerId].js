import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JWT_SECRET } from '@/components/hooks/envs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { careerId } = req.query;
  const userId = getUserId(req);

  if (!userId) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  switch (req.method) {
    case 'PATCH':
      await handlePatch(req, res, userId, careerId);
      break;
    case 'POST':
      await handlePost(req, res, userId);
      break;
    case 'DELETE':
      await handleDelete(req, res, userId, careerId);
      break;
    default:
      res.status(405).end();
      break;
  }
};

const getUserId = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  const payload = verify(token, JWT_SECRET);
  return payload.id;
};

const handlePatch = async (req, res, userId, careerId) => {
  try {
    const updatedCareer = await prisma.career.update({
      where: { id: parseInt(careerId) },
      data: {
        org_name: req.body.org_name,
        team: req.body.team,
        role: req.body.role,
        occupation: req.body.occupation,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        userId,
      },
    });
    res.json(updatedCareer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const handlePost = async (req, res, userId) => {
  try {
    const newCareer = await prisma.career.create({
      data: { ...req.body, userId },
    });
    res.json(newCareer);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const handleDelete = async (req, res, userId, careerId) => {
  try {
    await prisma.career.delete({
      where: { id: parseInt(careerId) },
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};
