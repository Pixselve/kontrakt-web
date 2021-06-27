import { Mark } from "~/types/types";

export abstract class MarkHelper {
  public static markToData = new Map<Mark, MarkData>([
    [
      Mark.Todo,
      {
        hexColor: "grey",
        text: "À faire",
        icon: "skip-forward",
        todo: true,
        perfectlyDone: false,
      },
    ],
    [
      Mark.Good,
      {
        hexColor: "green",
        text: "Bien",
        icon: "emoticon",
        todo: false,
        perfectlyDone: true,
      },
    ],
    [
      Mark.Bad,
      {
        hexColor: "red",
        text: "Mauvais",
        icon: "emoticon-neutral",
        todo: false,
        perfectlyDone: false,
      },
    ],
  ]);

  static isTodo(mark: Mark) {
    return this.markToData.get(mark)?.todo ?? false;
  }
  static isPerfectlyDone(mark: Mark) {
    return this.markToData.get(mark)?.perfectlyDone ?? false;
  }

  static get marks() {
    return Array.from(this.markToData, ([v, k]) => ({ ...k, value: v }));
  }
}

interface MarkData {
  hexColor: string;
  text: string;
  icon: string;
  todo: boolean;
  perfectlyDone: boolean;
}
