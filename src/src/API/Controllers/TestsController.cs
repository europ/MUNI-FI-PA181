using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Resources.Requests;
using API.Resources.Responses;
using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : Controller
    {
        private readonly ITestService _testService;
        private readonly IMapper _mapper;

        public TestsController(ITestService testService, IMapper mapper)
        {
            _testService = testService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tests = await _testService.GetAll();
            var response = _mapper.Map<IEnumerable<Test>, IEnumerable<TestResponse>>(tests);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var test = await _testService.Get(id);
            var response = _mapper.Map<Test, TestResponse>(test);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TestRequest testRequest)
        {
            var test = _mapper.Map<TestRequest, Test>(testRequest);
            await _testService.Create(test);

            var actionResult = await Get(test.Id);
            var okObjectResult = actionResult as OkObjectResult;
            var testResponse = okObjectResult?.Value as TestResponse;

            return CreatedAtAction(nameof(Get), new {id = test.Id}, testResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TestRequest testRequest)
        {
            var test = _mapper.Map<TestRequest, Test>(testRequest);
            test.Id = id;

            await _testService.Update(id, test);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _testService.Delete(id);
            return Ok();
        }
    }
}