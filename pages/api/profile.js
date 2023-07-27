import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@/components/hooks/envs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    try {
      const payload = verify(token, JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { userid: payload.userid },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({
        userid: user.userid,
        username: user.username,
        email: user.email,
        address: user.address,
        username_show: user.username_show,
        email_show: user.email_show,
      });
    } catch (error) {
      console.error("Token verification failed with error: ", error);

      res.status(401).send({ message: 'Invalid token' });
    }
  } else if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1];
    const { username, email, address, username_show, email_show } = req.body;

    if (!token) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    try {
      const payload = verify(token, JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { userid: payload.userid },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await prisma.user.update({
        where: { userid: payload.userid },
        data: { username, email, address, username_show, email_show },
      });

      res.status(200).json({ message: 'profile updated successfully', status: 'success' });
    } catch (error) {
      console.error("Token verification failed with error: ", error);

      res.status(401).send({ message: 'Invalid token' });
    }
  }
  else {
    res.status(405).send({ message: 'Method not allowed' });
  }
}
