# [![promote][promote-img]][promote-url]
**JavaScript Type Promotion**

[![npm][npm-img]][npm-url] [![downloads][dlm-img]][dlm-url] [![build status][travis-img]][travis-url]

## Usage

```js
// ES5
var promote = require("promote");

// ES6
import {promote} from "promote";
```

**promote(obj: object, promotype: callable, opts?: object): Promise**
- **obj**: object  
- An object, not `undefined` or `null`
- **promotype**: callable  
- The type to which the given object should be promoted to
- **opts**: object
  - **unsafe**: boolean = `false`  
  - `true` = Also allow promotion for incompatible types  
  - **strict**: boolean = `false`  
  - `true` = The object will be checked if it's already an instance of the given type

**promoteSync(obj: object, promotype: callable, opts?: object): boolean**
- **obj**: object  
- @see `promote()`
- **promotype**: callable  
- @see `promote()`
- **opts**: object  
- @see `promote()`
  - **silent**: boolean = `false`  
  - `true` = No exceptions will be thrown

### Function bind (ES7)

```js
let thing = new Thing();
thing.do();

thing::promote(SuperThing).then(() => {
  thing.superDo();
});

if (thing::promoteSync(SuperThing)) {
  thing.superDo();
}
```

## Examples
### One-Two

```js
import {promote} from "promote";

function printName(obj: object): void {
  console.log(obj.name);
  console.log("  name:", obj.getName());
}

class One {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Two extends One {
  getName() {
    return `${this.name}²`;
  }
}

let foo = {name: "foo"};
(promote(foo, Two)
  .then(printName)
  .catch(console.error)
);

let bar = new One("bar");
(bar::promote(Two)
  .then(printName)
  .catch(console.error)
);
```

```sh
> babel-node examples/one-two
foo
  name: foo²
bar
  name: bar²
```

### HTTP server with promoted response

```js
import {Server, ServerResponse} from "http";
import {promoteSync} from "promote";

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
```

```sh
> babel-node examples/http
Server running at http://localhost:8080/
```

[promote-img]: https://raw.githubusercontent.com/stefanr/node-promote/gh-pages/images/promote.png
[promote-url]: https://npmjs.org/package/promote
[npm-img]: https://img.shields.io/npm/v/promote.svg
[npm-url]: https://npmjs.org/package/promote
[dlm-img]: https://img.shields.io/npm/dm/promote.svg
[dlm-url]: https://npmjs.org/package/promote
[travis-img]: https://travis-ci.org/stefanr/node-promote.svg
[travis-url]: https://travis-ci.org/stefanr/node-promote
