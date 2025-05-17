import net from "net";

const client = net.connect({ port: 60300 });

const command = process.argv.splice(2).join(" ");

if (!command) {
  console.log("Usage: node dist/ejercicio9/client.js <command>");
  process.exit(1);
}

client.on("connect", () => {
  console.log("Connected to port 60300 successfully. :D");
});

client.write(command + "\n");

let wholeData = "";
client.on("data", (dataChunk) => {
  wholeData += dataChunk;
});

client.on("end", () => {
  const message = JSON.parse(wholeData);

  if (message.type === "response") {
    if (message.success) {
      console.log(message.output);
    } else {
      console.log("Command failed");
    }
    console.log(`Process exited with code ${message.code}`);
  } else {
    console.log(`Unknown message type: ${message.type}`);
  }
});
