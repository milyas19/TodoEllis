
using System.Net.Http.Headers;
using Application.Dtos;
using AutoMapper;
using Entities;
using Persistence.Data.DBWrapper;

namespace Application.Service
{
    public interface ITodoService
    {
        List<TodoDto> GetTodoList();
        TodoDto GetTodoById(int id);
        TodoDto LagreTodo(CreateTodoDto createTodoDto);
        bool SletteTodo(int id);
    }

    public class TodoService : ITodoService
    {
        private readonly ITodoDBWrapper _todoDBWrapper;
        private readonly IMapper _mapper;

        public TodoService(ITodoDBWrapper todoDBWrapper, IMapper mapper)
        {
            _todoDBWrapper = todoDBWrapper ?? throw new ArgumentNullException(nameof(todoDBWrapper));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        public TodoDto GetTodoById(int id)
        {
            var response = _todoDBWrapper.GetTodoById(id);
            return _mapper.Map<TodoDto>(response);
        }

        public List<TodoDto> GetTodoList()
        {
            var response = _todoDBWrapper.GetTodoList();
            return _mapper.Map<List<TodoDto>>(response);
        }

        public TodoDto LagreTodo(CreateTodoDto createTodoDto)
        {
            //2.  Vi henter createTodoDto fra kontrller og mappe med TODO slik at vi kan videresende til DBWrapper (Lagre i database)
            var todoObj = new Todo()
            {
                ErFerdig = createTodoDto.IsFinished,
                Beskrivelse = createTodoDto.Description,
                Dato = createTodoDto.Date
            };
            //5. Vi tar imot TODO object fra wrapper (response) og mapper med todoDto slik at vi kan returnere til kontroller
            var response = _todoDBWrapper.SaveTodo(todoObj);


            var todoDtoObj = new TodoDto()
            {
                Id = response.Id,
                IsFinished = response.ErFerdig,
                Description = response.Beskrivelse,
                Date = response.Dato
            };
            return todoDtoObj;
        }

        public bool SletteTodo(int id)
        {
            return _todoDBWrapper.DeleteTodo(id);
        }
    }
}