let requestCount = 0;

export function handleRequest(req, res) {
  if (req.url === "/" && req.method === "GET") {
    requestCount++;
    const response = {
      message: "Request handled successfully",
      requestCount,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}
