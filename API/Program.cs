using Application;
using Application.Service;
using Persistence.Data;
using Persistence.Data.DBWrapper;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<TodoContext>();
builder.Services.AddDbContext<TodoContext>
               (options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddScoped<ITodoDBWrapper, TodoDBWrapper>();
builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddAutoMapper(typeof(DefaultProfile));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
