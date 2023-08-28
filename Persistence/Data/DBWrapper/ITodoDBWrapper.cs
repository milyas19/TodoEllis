using Entities;

namespace Persistence.Data.DBWrapper
{
    public interface ITodoDBWrapper
    {
        List<Todo> GetTodoList();
        Todo GetTodoById(int id);
        Todo SaveTodo(Todo todo);
        bool DeleteTodo(int id);
    }
}


