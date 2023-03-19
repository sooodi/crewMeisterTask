import { TodoModel } from "../models/redux-models";
import Api from "./Api";

export default {
  async getAllAbsense() {
    var response = await Api().get("absenses");
    return response.data;
  },
  async getMembersTodo(todo_id: number) {
    var response = await Api().get("member");
    return response.data.filter((todo: TodoModel) => todo.id === todo_id)[0];
  },
};
