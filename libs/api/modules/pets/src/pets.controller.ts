import { Request, Response } from 'express';

import { fetchAllPets } from './pets.service';

export const getAllPets = async (req: Request, res: Response) => {
  const pets = await fetchAllPets();

  res.send(pets);
};
