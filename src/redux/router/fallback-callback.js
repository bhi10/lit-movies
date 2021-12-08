import { store } from "../store";
import { currentPage, currentId } from "./selector";


export default function(){
  let page = currentPage(store.getState());
  let id = currentId(store.getState());

  
}