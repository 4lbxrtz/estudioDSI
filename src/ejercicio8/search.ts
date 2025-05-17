import fs from "fs";
import { basename, join, resolve } from "path";
import { exit } from "process";

export function search(pathDir: string, extension: string) {
  fs.access(pathDir, (err) => {
    if (err) {
      console.log("The path you are providing does not exist.");
      return;
    }

    fs.readdir(pathDir, { recursive: true }, (readErr, files) => {
      if (readErr) {
        console.log("There was an error reading the directory.");
      } else {
        files.forEach((file) => {
          const extensionDelim = file.toString().lastIndexOf(".") + 1;
          const fileExtension = file.toString().slice(extensionDelim);
          if (fileExtension === extension) {
            console.log(file);
          }
        });
      }
    });
  });
}

const pathDir = process.argv[2];
const extension = process.argv[3];

if (process.argv.length !== 4) {
  console.log("There was an error in the prompt.");
  console.log("Usage: node dist/...js <file>");
  exit(1);
}

search(pathDir, extension);
