//
import type { NextApiRequest, NextApiResponse } from "next";

//
import { prisma } from "database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid } = req.query;
    const users = await prisma.user.findUnique({
      where: { id: uid as string },
    });
    if (!users)
      throw {
        message: "Failed to retrieve users",
        status: 500,
      };

    return res.status(200).json({
      users,
    });
  } catch ({ message = "An unknown error occured", status = 500 }) {
    console.error({ message, status });
    return res.status(status as number).end(message);
  }
}
