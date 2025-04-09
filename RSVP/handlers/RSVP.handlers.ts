import { RequestHandler } from 'express';

import { ErrorWithStatus, StanderdResponse } from '../../helpers/types';
import RSVPModule, { RSVP } from '../models/RSVP.models';
import { sendRSVPNotification } from '../../helpers/mailer';

export const post_rsvp: RequestHandler<
  unknown,
  StanderdResponse<RSVP>,
  RSVP,
  unknown
> = async (req, res, next) => {
  try {
    const { firstName, lastName, numberOfGuests, isComing } = req.body;

    if (
      !firstName ||
      !lastName ||
      numberOfGuests === undefined ||
      isComing === undefined
    ) {
      throw new ErrorWithStatus('All fields are required.', 400);
    }

    const results = await RSVPModule.create({
      firstName,
      lastName,
      numberOfGuests,
      isComing,
    });

    await sendRSVPNotification(firstName, lastName, numberOfGuests, isComing);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const get_rsvp: RequestHandler<
  unknown,
  StanderdResponse<RSVP[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const results = await RSVPModule.find().sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};
