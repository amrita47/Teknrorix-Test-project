using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApiProject.Data;

[ApiController]
[Route("api/v1/jobs")]
public class JobsController : ControllerBase
{
    private readonly ILogger<JobsController> _logger;

    public JobsController(ILogger<JobsController> logger)
    {
        _logger = logger;
    }
    private readonly AppDbContext _context; 
    public JobsController(AppDbContext context, ILogger<JobsController> logger) {
        _context = context;
        _logger = logger; 
    }
    [HttpPost]
    public IActionResult CreateJob([FromBody] JobModel job)
    {
        _logger.LogInformation("Received request to create job");

        if (job == null)
        {
            _logger.LogWarning("Job data is null");
            return BadRequest(new { message = "Invalid job data" });
        }

        _logger.LogInformation("Job data is valid");

        var response = new
        {
            status = "success",
            data = job
        };

        _logger.LogInformation("Returning successful response");
        return Ok(response);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateJob(int id, [FromBody] JobModel job)
    {
        if (job == null || id <= 0)
        {
            return BadRequest(new { message = "Invalid job data or ID" });
        }

        var existingJob = _context.Jobs.Find(id);
        if (existingJob == null)
        {
            return NotFound(new { message = "Job not found" });
        }

        existingJob.Title = job.Title;
        existingJob.Description = job.Description;
        existingJob.LocationId = job.LocationId;
        existingJob.DepartmentId = job.DepartmentId;
        existingJob.ClosingDate = job.ClosingDate;

        _context.SaveChanges();

        var response = new
        {
            status = "success",
            data = existingJob
        };

        return Ok(response);
    }
    [HttpPost("list")]
    public IActionResult ListJobs([FromBody] JobListRequest request)
    {
        var query = _context.Jobs.AsQueryable();

        // Filter by search string
        if (!string.IsNullOrEmpty(request.Q))
        {
            query = query.Where(j => j.Title.Contains(request.Q) || j.Description.Contains(request.Q));
        }

        // Filter by location
        if (request.LocationId.HasValue)
        {
            query = query.Where(j => j.LocationId == request.LocationId.Value);
        }

        // Filter by department
        if (request.DepartmentId.HasValue)
        {
            query = query.Where(j => j.DepartmentId == request.DepartmentId.Value);
        }

        // Get the total count for pagination
        var total = query.Count();

        // Apply pagination
        var jobs = query.Skip((request.PageNo - 1) * request.PageSize)
                        .Take(request.PageSize)
                        .Select(j => new
                        {
                            j.Id,
                            Code = "JOB-" + j.Id.ToString("D2"),
                            j.Title,
                            Location = "Location Placeholder", 
                            Department = "Department Placeholder",
                            j.PostedDate,
                            j.ClosingDate
                        }).ToList();

        var response = new
        {
            total,
            data = jobs
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetJobDetails(int id)
    {
        var job = _context.Jobs
                          .Where(j => j.Id == id)
                          .Select(j => new
                          {
                              j.Id,
                              Code = "JOB-" + j.Id.ToString("D2"),
                              j.Title,
                              j.Description,
                              Location = new
                              {
                                  Id = j.LocationId,
                                  Title = "US Head Office", 
                                  City = "Baltimore", 
                                  State = "MD", 
                                  Country = "United States", 
                                  Zip = 21202 
                              },
                              Department = new
                              {
                                  Id = j.DepartmentId,
                                  Title = "Software Development" 
                              },
                              j.PostedDate,
                              j.ClosingDate
                          })
                          .FirstOrDefault();

        if (job == null)
        {
            return NotFound(new { message = "Job not found" });
        }

        return Ok(job);
    }

}
public class JobListRequest
{
    public string Q { get; set; }
    public int PageNo { get; set; }
    public int PageSize { get; set; }
    public int? LocationId { get; set; }
    public int? DepartmentId { get; set; }
}

public class JobModel 
{ public string Title { get; set; }
    public string Description { get; set; }
    public int LocationId { get; set; } 
    public int DepartmentId { get; set; }
    public DateTime ClosingDate { get; set; } 
    public DateTime PostedDate { get; set; } }
   