import AddTodo from "@/components/shared/AddTodo";
import { prisma } from "@/utils/prisma";
import DeleteTodo from "@/components/shared/DeleteTodo";
import ChangeTodo from "@/components/shared/ChangeTodo";
import EditTodo from "@/components/shared/EditTodo";
import { todoType } from "@/types/todoType";

function Card() {
  return (
    <div className="w-full h-screen grid items-center">
      <AddTodo />
      <div className="flex gap-x-5"></div>
    </div>
  );
}

export default Card;
