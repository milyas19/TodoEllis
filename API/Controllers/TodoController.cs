using Application.Dtos;
using Application.Service;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            //testing
            _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
        }

        [HttpGet]
        public List<TodoDto> GetTodoList()
        {
            return _todoService.GetTodoList();
        }

        [HttpGet("id")]
        public TodoDto GetTodoById(int id)
        {
            return _todoService.GetTodoById(id);
        }

        [HttpPost]
        public TodoDto LagreTodoObject(CreateTodoDto createTodoDto)
        {
            //1.  vi sender createTodoDto til service og får tilbake TodoDto object
            var response = _todoService.LagreTodo(createTodoDto);
            //6. Vi henter todoDto object som respons fra TodoService og returnere til slutt brukeren
            return response;
        }
    }
}
