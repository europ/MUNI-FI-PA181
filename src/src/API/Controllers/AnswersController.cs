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
    public class AnswersController : Controller
    {
        private readonly IAnswerService _answerService;
        private readonly IMapper _mapper;

        public AnswersController(IAnswerService answerService, IMapper mapper)
        {
            _answerService = answerService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var answers = await _answerService.GetAll();
            var response = _mapper.Map<IEnumerable<Answer>, IEnumerable<AnswerResponse>>(answers);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var answer = await _answerService.Get(id);
            var response = _mapper.Map<Answer, AnswerResponse>(answer);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AnswerRequest answerRequest)
        {
            var answer = _mapper.Map<AnswerRequest, Answer>(answerRequest);
            await _answerService.Create(answer);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AnswerRequest answerRequest)
        {
            var answer = _mapper.Map<AnswerRequest, Answer>(answerRequest);
            answer.Id = id;

            await _answerService.Update(id, answer);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _answerService.Delete(id);
            return Ok();
        }
    }
}