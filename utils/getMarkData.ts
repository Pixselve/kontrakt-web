import { Mark } from "~/types/types";

export default (mark: Mark): {hexColor: string, text: string, icon: string} => {
  switch (mark) {
    case Mark.Todo:
      return {
        hexColor: "grey",
        text: "À faire",
        icon: "skip-forward"
      }
    case Mark.Good:
      return {
        hexColor: "green",
        text: "Bien",
        icon: "emoticon"
      }
    case Mark.Bad:
      return {
        hexColor: "red",
        text: "Mauvais",
        icon: "emoticon-neutral"
      }
  }
}
