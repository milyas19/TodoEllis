using Entities;

namespace Persistence.Data.DBWrapper
{
    public class TodoDBWrapper : ITodoDBWrapper
    {
        private readonly TodoContext _todoContext;

        public TodoDBWrapper(TodoContext todoContext)
        {
            _todoContext = todoContext;
        }

        public Todo GetTodoById(int id)
        {
            var todo = _todoContext.Todos.Where(x => x.Id == id).SingleOrDefault();
            if (todo == null)
                throw new ArgumentException("Record not found");
            return todo;
        }

        public List<Todo> GetTodoList()
        {
            return _todoContext.Todos.ToList();
        }

        public Todo SaveTodo(Todo todo)
        {
            _todoContext.Add(todo);
            _todoContext.SaveChanges();
            return todo;
        }

        public bool DeleteTodo(int id)
        {
            var _todoSkalSlettes = _todoContext.Todos.Where(x => x.Id == id).SingleOrDefault();
            if (_todoSkalSlettes == null)
                throw new Exception("Record does not exist in database");
            else
            {
                try
                {
                    _todoContext.Remove(_todoSkalSlettes);
                    if (_todoContext.SaveChanges() > 0)
                        return true;
                    else
                        return false;
                }
                catch (Exception e)
                {

                    var _error = e.Message.ToString();
                    return false;
                }
            }
        }

        public Todo UpdateTodo(Todo todo)
        {
            _todoContext.Update(todo);
            _todoContext.SaveChanges();
            return todo;
        }
    }
}
