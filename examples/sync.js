/*
 * promote
 * example : sync
 */
import {promoteSync} from "../";

function pointToString(p: object, label: string): string {
  return `${label}(x = ${p.x}, y = ${p.y}) instanceof ${Object.getPrototypeOf(p)}`;
}

class Point {
  x: number;
  y: number;
  move(x: number, y: number): void {
    if (x instanceof Point) {
      [x, y] = [x.x, x.y];
    }
    this.x = x;
    this.y = y;
  }
  toString() {
    return "Point";
  }
}

let a = {x: 10, y: 15};
console.log(pointToString(a, "a"));

if (promoteSync(a, Point)) {
  a.move(20, 30);
}
console.log(pointToString(a, "a"));

let b = Object.create(null);
if (b::promoteSync(Point)) {
  b.move(a);
}
console.log(pointToString(b, "b"));
