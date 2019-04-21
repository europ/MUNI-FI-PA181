using System.Collections.Generic;
using System.IO;
using API.Extensions;
using API.Utilities.ErrorHandling;
using API.Utilities.Logging;
using AutoMapper;
using Entities.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using Swashbuckle.AspNetCore.Swagger;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info {Title = "My API", Version = "v1"}); });
            services.AddAutoMapper();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // TODO: Change for production environment.
            services.AddDbContext<AppDbContext>(options => { options.UseInMemoryDatabase("my-api-in-memory"); });
            services.AddServices(Configuration);

            services.AddSingleton<ILoggerManager, LoggerManager>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerManager logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new
                    List<string> {"index.html"}
            });
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStaticFiles();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });
            app.UseMvc();
        }
    }
}