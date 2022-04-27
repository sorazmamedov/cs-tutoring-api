import makeAddAnnouncement from "./add-announcement";
import makeListAnnouncements from "./list-announcements";
import makeEditAnnouncement from "./edit-announcement";
import makeRemoveAnnouncement from "./remove-announcement";

import db from "../../data-access";
import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

const addAnnouncement = makeAddAnnouncement({ db, responseTxt });
const listAnnouncements = makeListAnnouncements({ db, responseTxt, Roles });
const editAnnouncement = makeEditAnnouncement({ db, responseTxt });
const removeAnnouncement = makeRemoveAnnouncement({ db, responseTxt });

const announcementService = Object.freeze({
  addAnnouncement,
  listAnnouncements,
  editAnnouncement,
  removeAnnouncement,
});

export default announcementService;
export {
  addAnnouncement,
  listAnnouncements,
  editAnnouncement,
  removeAnnouncement,
};
