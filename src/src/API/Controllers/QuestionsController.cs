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
    public class QuestionsController : Controller
    {
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;

        public QuestionsController(IQuestionService questionService, IMapper mapper)
        {
            _questionService = questionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _questionService.GetAll();
            var response = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionResponse>>(questions);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var question = await _questionService.Get(id);
            var response = _mapper.Map<Question, QuestionResponse>(question);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuestionRequest questionRequest)
        {
            var question = _mapper.Map<QuestionRequest, Question>(questionRequest);
            await _questionService.Create(question);

            var actionResult = await Get(question.Id);
            var okObjectResult = actionResult as OkObjectResult;
            var questionResponse = okObjectResult?.Value as QuestionResponse;

            return CreatedAtAction(nameof(Get), new {id = question.Id}, questionResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] QuestionRequest questionRequest)
        {
            var question = _mapper.Map<QuestionRequest, Question>(questionRequest);
            question.Id = id;

            await _questionService.Update(id, question);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _questionService.Delete(id);
            return Ok();
        }
    }
}