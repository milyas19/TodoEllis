namespace Application.Dtos
{
    public class CreateTodoDto
    {
        public bool IsFinished { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
    }
}