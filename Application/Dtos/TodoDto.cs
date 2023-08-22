namespace Application.Dtos
{
    public class TodoDto
    {
        public int Id { get; set; }
        public bool IsFinished { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
    }
}
