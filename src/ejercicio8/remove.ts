import fs from "fs";
import { basename, join, resolve } from "path";
import { exit } from "process";

export function remove(pathFile: string) {
  fs.access(pathFile, (err) => {
    if (err) {
      console.log("The path you are providing does not exist.");
      return;
    }

    const recyclePath = "/home/alberto/estudiar/estudioDSI/recycle";
    const target = join(recyclePath, basename(pathFile));

    fs.copyFile(pathFile, target, (copyErr) => {
      if (copyErr) {
        console.log("There was an error copying the file.");
      } else {
        fs.rm(pathFile, (rmErr) => {
          if (rmErr) {
            console.log("There was an error deleting the file.");
          } else {
            console.log("File successfully moved to recycle bin.");
          }
        });
      }
    });
  });
}

const pathFile = process.argv[2];

if (process.argv.length !== 3) {
  console.log("There was an error in the prompt.");
  console.log("Usage: node dist/...js <file>");
  exit(1);
}

remove(pathFile);
