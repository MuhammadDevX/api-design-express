import prisma from "../db.js";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth.js";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJwt(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "User not found" });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const token = createJwt(user);
  res.json({ token });
};
