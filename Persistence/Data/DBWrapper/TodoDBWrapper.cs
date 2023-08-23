using System.Reflection.Metadata.Ecma335;
using System.Xml;
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
            //3. Henter data fra TodoService og lagre den i databasen
            _todoContext.Add(todo);
            _todoContext.SaveChanges();
            //4. Vi returnerer todo object til service
            return todo;
        }

        public bool DeleteTodo(int id)
        {
            var _todoSkalSlettes = _todoContext.Todos.Where(x => x.Id == id).SingleOrDefault();
            if (_todoSkalSlettes == null)
                return false;
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
                catch (System.Exception e)
                {

                    var _error = e.Message.ToString();
                    return false;
                }
            }
        }
    }
}
