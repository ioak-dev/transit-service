const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { trackCollection, trackSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

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
        from: zonedTimeToUtc(data.from, "America/New_York"),
        to: zonedTimeToUtc(data.to, "America/New_York"),
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      ...data,
      from: zonedTimeToUtc(data.from, "America/New_York"),
      to: zonedTimeToUtc(data.to, "America/New_York"),
    });
  }

  return response;
};

export const uploadTrack = async (
  space: string,
  eventId: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, trackCollection, trackSchema);
  if (!Array.isArray(data)) {
    return null;
  }

  const responseList: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const from = parse(data[i].from, "yyyyMMddHHmm", new Date());
    const to = parse(data[i].to, "yyyyMMddHHmm", new Date());
    const hoursToAdd = 25 * 60 * 60 * 1000;
    from.setTime(from.getTime() + hoursToAdd);
    to.setTime(to.getTime() + hoursToAdd);
    const response = await updateTrack(space, {
      ...data[i],
      from,
      to,
      eventId,
    });
    responseList.push(response);
  }

  return responseList;
};

export const getTrack = async (space: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  return await model.find();
};

export const getTrackByEventId = async (space: string, eventId: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  return await model.find({ eventId });
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

export const deleteAllTrack = async (space: string, eventId: string) => {
  const model = getCollection(space, trackCollection, trackSchema);

  return await model.remove({ eventId });
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
