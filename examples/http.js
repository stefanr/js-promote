/*
 * promote
 * example : http
 */
import {Server, ServerResponse} from "http";
import {promoteSync} from "../";

class HttpResponse extends ServerResponse {
  writeHeading(title: string) {
    this.writeHead(200, {
      "Content-Type": "text/html",
    });
    this.end(`<h1>${title}</h1>`);
  }
}

class HttpServer extends Server {
  constructor(requestListener?: callable) {
    super((req, res) => {
      res::promoteSync(HttpResponse);
    });
    if (typeof requestListener === "function") {
      this.on("request", requestListener);
    }
  }
}

let server = new HttpServer((req, res) => {
  res.writeHeading("Hello World");
});
server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
