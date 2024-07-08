import { Router } from 'express';
import * as petsController from './pets.controller';

const router = Router();

router.get('/', petsController.getAllPets);

export { router };
