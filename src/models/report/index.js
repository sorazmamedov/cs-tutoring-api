import {} from "../../Id";
import buildMakeReport from "./report";
import { reportValidator } from "../../validator";

const makeReport = buildMakeReport({ reportValidator });

export default makeReport;
