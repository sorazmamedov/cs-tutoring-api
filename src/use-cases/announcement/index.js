import makeAddAnnouncement from "./add-announcement";
import makeListAnnouncements from "./list-announcements";
import makeEditAnnouncement from "./edit-announcement";
import makeRemoveAnnouncement from "./remove-announcement";

import db from "../../data-access";

const addAnnouncement = makeAddAnnouncement({ db });
const listAnnouncements = makeListAnnouncements({ db });
const editAnnouncement = makeEditAnnouncement({ db });
const removeAnnouncement = makeRemoveAnnouncement({ db });

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
