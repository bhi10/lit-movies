import { store } from "../store";
import { currentPage, currentId } from "./selector";
import { navigatePage } from "@dreamworld/router";


export default function () {
  let page = currentPage(store.getState());
  let id = currentId(store.getState());

  if (!id) {
    window.history.back();
    return;
  }
}