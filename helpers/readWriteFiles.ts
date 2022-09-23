import fs from "fs";
import path from "path";
import process from "process";

// TODO: Create buildFeedbackPath to get the file location/path
export const buildPath = (apiName: string) => {
  const pathh = path.join(process.cwd(), "data", `${apiName}`);
  return pathh;
};

// TODO: Create a func which returns feedback data
export const fileData = (path: string) => {
  const file = fs.readFileSync(path, "utf-8");
  const data = JSON.parse(file);
  return data;
};
