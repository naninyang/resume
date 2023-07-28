import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === 'GET') {
    try {
      const careers = await prisma.career.findMany({
        include: {
          projects: true,
        },
      });

      res.status(200).json(careers);
    } catch (e) {
      res.status(500).json({ error: "An error occurred while fetching the careers" });
    }

  } else if (req.method === 'POST') {
    const careers = req.body.careers;

    for (let career of careers) {
      const { id, projects, ...otherFields } = career;

      if (id) {
        await prisma.career.update({
          where: { id },
          data: otherFields
        });

        const existingProjects = await prisma.project.findMany({
          where: { career_id: id }
        });

        for (let project of projects) {
          if (project.id) {
            await prisma.project.update({
              where: { id: project.id },
              data: project
            });
          } else {
            await prisma.project.create({
              data: {
                ...project,
                career_id: id,
              },
            });
          }
        }

        for (let existingProject of existingProjects) {
          if (!projects.some(project => project.id === existingProject.id)) {
            await prisma.project.delete({
              where: { id: existingProject.id }
            });
          }
        }
      } else {
        const createdCareer = await prisma.career.create({
          data: otherFields,
        });

        for (let project of projects) {
          await prisma.project.create({
            data: {
              ...project,
              career_id: createdCareer.id,
            },
          });
        }
      }
    }

    res.status(200).json({ success: "Career and its projects updated successfully." });

  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
