const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { trackCollection, trackSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";

export const updateTrack = async (
  space: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, trackCollection, trackSchema);
  let response = null;
  if (data._id) {
    response = await model.findByIdAndUpdate(
      data._id,
      {
        ...data,
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      ...data,
    });
  }

  return response;
};

export const getTrack = async (space: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  return await model.find();
};

export const getTrackById = async (space: string, id: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteTrack = async (space: string, id: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  return await model.remove({ _id: id });
};

export const getCurrentTracksByEvent = async (
  space: string,
  eventId: string
) => {
  const model = getCollection(space, trackCollection, trackSchema);
  return await model
    .find({
      $and: [
        { eventId },
        // { from: { $lte: new Date() } },
        // { to: { $gte: new Date() } },
      ],
    })
    .sort({ from: "asc" });
};
