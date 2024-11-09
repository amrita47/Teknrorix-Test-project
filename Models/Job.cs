namespace MyApiProject.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int LocationId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime PostedDate { get; set; }
    

}
}
