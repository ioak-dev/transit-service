import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateParticipant,
  getParticipant,
  deleteParticipant,
  getParticipantById,
  getParticipantByReferenceId,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put(
    "/participant/:space",
    authorizeApi,
    asyncHandler(updateParticipant)
  );
  router.get("/participant/:space", authorizeApi, asyncHandler(getParticipant));
  router.get("/participant/:space/:id", asyncHandler(getParticipantById));
  router.get(
    "/participant/:space/reference/:referenceId",
    asyncHandler(getParticipantByReferenceId)
  );
  router.delete(
    "/participant/:space/:id",
    authorizeApi,
    asyncHandler(deleteParticipant)
  );
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
