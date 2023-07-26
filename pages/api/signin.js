import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/components/utilities/envs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userid, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userid: userid,
      },
    });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // User is authenticated, generate a token and send it
        const payload = { userid: user.userid };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '14d' });

        res.status(200).json({ status: 'success', token });
      } else {
        res.status(401).json({ status: 'error', message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
