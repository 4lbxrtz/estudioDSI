import { spawn } from "child_process";
import net from "net";

const server = net.createServer((connection) => {
  console.log("A client has connected.");
  let wholeChunk = "";
  connection.on("data", (data) => {
    console.log("User has sent data");
    wholeChunk += data.toString();
    const delimiter = wholeChunk.indexOf("\n");
    if (delimiter !== -1) {
      const command = wholeChunk.substring(0, delimiter).trim();
      wholeChunk = "";
      const parts = command.split(" ");
      let output = "";
      let responded = false;
      try {
        const child = spawn(parts[0], parts.slice(1));
        child.stdout.on("data", (data) => {
          output += data.toString();
        });
        child.stderr.on("data", (data) => {
          output += data.toString();
        });
        child.on("close", (code) => {
          if (responded) return;
          responded = true;
          const response = {
            type: "response",
            success: code === 0,
            output: output,
            code: code,
          };
          connection.write(JSON.stringify(response));
          connection.end();
        });
        child.on("error", (err) => {
          if (responded) return;
          responded = true;
          const response = {
            type: "response",
            success: false,
            output: `Failed to run command: ${err.message}`,
            code: -1,
          };
          connection.write(JSON.stringify(response));
          connection.end();
        });
      } catch (err) {
        if (responded) return;
        responded = true;
        const response = {
          type: "response",
          success: false,
          output: `Exception: ${(err as Error).message}`,
          code: -1,
        };
        connection.write(JSON.stringify(response));
        connection.end();
      }
    }
  });
  connection.on("end", () => {
    console.log("A client has disconnected");
  });
});

server.listen(60300, () => {
  console.log("Waiting for clients to connect (port 60300).");
});
