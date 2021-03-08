import express from 'express';
import User from '../models/User.js';

export default (req, _, next) => {
  if (req.user) {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        last_seen: new Date(),
      },
      { new: true },
    );
  }
  next();
};