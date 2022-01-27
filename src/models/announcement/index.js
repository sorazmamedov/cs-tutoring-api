import Id from "../../Id";
import buildMakeAnnouncement from "./announcement";
import { announcementValidator } from "../../validator";

const makeAnnouncement = buildMakeAnnouncement({ Id, announcementValidator });

export default makeAnnouncement;
