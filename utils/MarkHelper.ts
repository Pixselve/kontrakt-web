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
      Mark.ToCorrect,
      {
        hexColor: "grey",
        text: "À corriger",
        icon: "skip-forward",
        todo: true,
        perfectlyDone: false,
      }
    ],
    [
      Mark.ToFinish,
      {
        hexColor: "grey",
        text: "À Terminer",
        icon: "skip-forward",
        todo: true,
        perfectlyDone: false,
      }
    ],
    [
      Mark.VeryGood,
      {
        hexColor: "green",
        text: "Acquis",
        icon: "emoticon",
        todo: false,
        perfectlyDone: true,
      },
    ],
    [
      Mark.Good,
      {
        hexColor: "blue",
        text: "Acquis avec quelques erreurs",
        icon: "emoticon",
        todo: false,
        perfectlyDone: true,
      },
    ],
    [
      Mark.Bad,
      {
        hexColor: "orange",
        text: "En voie d'acquisition",
        icon: "emoticon",
        todo: false,
        perfectlyDone: true,
      },
    ],
    [
      Mark.VeryBad,
      {
        hexColor: "red",
        text: "Non acquis",
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
