import Id from "../../Id";
import buildMakeReport from "./report";
import { reportValidator } from "../../validator";

const makeReport = buildMakeReport({ Id, reportValidator });

export default makeReport;
