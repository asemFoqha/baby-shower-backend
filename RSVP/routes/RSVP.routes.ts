import { Router } from 'express';
import { get_rsvp, post_rsvp } from '../handlers/RSVP.handlers';

const RSVPRouter = Router();

RSVPRouter.post('/', post_rsvp);
RSVPRouter.get('/', get_rsvp);

export default RSVPRouter;
