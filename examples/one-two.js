/*
 * promote
 * example : one-two
 */
import {promote} from "../";

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
