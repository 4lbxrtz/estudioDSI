import { spawn } from "child_process";

let file = process.argv[2];

const cat = spawn("cat", [file]);
const wc = spawn("wc", ["-l"]);

cat.stdout.pipe(wc.stdin);

let wcOutput = "";

wc.stdout.on("data", (piece) => {
  wcOutput += piece;
});

wc.on("close", () => {
  process.stdout.write(wcOutput);
});
