namespace Entities
{
    public class Todo
    {
        public int Id { get; set; }
        public bool ErFerdig { get; set; }
        public string? Beskrivelse { get; set; }
        public DateTime Dato { get; set; }
    }
}