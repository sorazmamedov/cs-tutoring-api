import {
  addAnnouncement,
  listAnnouncements,
  editAnnouncement,
  removeAnnouncement,
} from "../../use-cases/announcement";

import makeCreateAnnouncement from "./create-announcement";
import makeGetAnnouncements from "./get-announcements";
import makeUpdateAnnouncement from "./update-announcement";
import makeDeleteAnnouncement from "./delete-announcement";

const createAnnouncement = makeCreateAnnouncement({ addAnnouncement });
const deleteAnnouncement = makeDeleteAnnouncement({ removeAnnouncement });
const getAnnouncements = makeGetAnnouncements({ listAnnouncements });
const updateAnnouncement = makeUpdateAnnouncement({ editAnnouncement });
const announcementController = Object.freeze({
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
});

export default announcementController;
export {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
