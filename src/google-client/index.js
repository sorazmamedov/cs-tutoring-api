import { OAuth2Client } from "google-auth-library";
export default new OAuth2Client(process.env.CLIENT_ID);

