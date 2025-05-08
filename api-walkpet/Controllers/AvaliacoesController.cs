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
            // Procura o passeador pelo username
            var passeador = await _context.Passeadores
                .FirstOrDefaultAsync(p => p.Username == username);

            if (passeador == null)
            {
                return NotFound();  // Retorna 404 se o passeador não for encontrado
            }

            // Busca as avaliações do passeador usando o ID
            var avaliacoes = await _context.Avaliacoes
                .Where(a => a.PasseadorId == passeador.Id)
                .ToListAsync();

            return avaliacoes;
        }

        [HttpPost]
        public async Task<ActionResult<Avaliacao>> Criar(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Add(avaliacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAvaliacoesPorUsername), new { username = avaliacao.Passeador.Username }, avaliacao);
        }
    }
}