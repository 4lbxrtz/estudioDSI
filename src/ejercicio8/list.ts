import fs from "fs";
import { basename, join, resolve } from "path";

export function list(pathFile: string) {
  fs.access(pathFile, (err) => {
    if (err) {
      console.log("The path you are providing does not exist.");
    } else {
      fs.readdir(pathFile, (err, files) => {
        if (err) {
          console.log("There was an error reading the directory");
        } else {
          files.forEach((file) => {
            fs.stat(join(pathFile, file), (err, stats) => {
              if (err) {
                console.log(
                  "There was an error checking the stats of the file.",
                );
              } else {
                console.log(
                  `File: ${file} => modification time: ${stats.mtime} | size: ${stats.size}`,
                );
              }
            });
          });
        }
      });
    }
  });
}

const pathFile = process.argv[2];

if (process.argv.length !== 3) {
  console.log("There was an error in the prompt.");
  console.log("Usage: node dist/...js <file>");
  process.abort();
}

list(pathFile);
