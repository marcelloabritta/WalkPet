using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers
{
    [ApiController]
    [Route("api/avaliacoes")]
    public class AvaliacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AvaliacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Avaliacao>>> GetTodas()
        {
            var avaliacoes = await _context.Avaliacoes.ToListAsync();
            return Ok(avaliacoes);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<Avaliacao>>> GetAvaliacoesPorUsername(string username)
        {
        var passeador = await _context.Passeadores
            .FirstOrDefaultAsync(p => p.Username == username);
        if (passeador == null)
            return NotFound();

         var avaliacoes = await _context.Avaliacoes
            .Where(a => a.PasseadorId == passeador.Id)
            .ToListAsync();
        return Ok(avaliacoes);                      
        }

        [HttpPost]
public async Task<ActionResult<Avaliacao>> Criar([FromBody] Avaliacao avaliacao)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    avaliacao.Data = DateTime.UtcNow;
    _context.Avaliacoes.Add(avaliacao);
    await _context.SaveChangesAsync();

    var passeador = await _context.Passeadores.FindAsync(avaliacao.PasseadorId);
    return CreatedAtAction(
        nameof(GetAvaliacoesPorUsername),
        new { username = passeador.Username },
        avaliacao
    );
}
    }
}