using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Runtime.CompilerServices;
namespace API.Controllers
{
    [ApiController]
    [Route("api/passeadores")]
    public class PasseadoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PasseadoresController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passeador>>> GetTodos()
        {
            var passeadores = await _context.Passeadores
    .Include(p => p.Avaliacoes)
    .ToListAsync();
            return Ok(passeadores);
        }

        [HttpPost]
        public async Task<ActionResult<Passeador>> Criar(Passeador passeador)
        {
            var passeadorExistente = await _context.Passeadores
                .FirstOrDefaultAsync(p => p.Cpf == passeador.Cpf || p.Email == passeador.Email);

            if (passeadorExistente != null)
            {
                return Conflict("Já existe um passeador com esse CPF ou email.");
            }

            _context.Passeadores.Add(passeador);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetTodos), new { id = passeador.Id }, passeador);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Passeador>> GetPorUsername(string username)
        {
            var passeador = await _context.Passeadores
                .Include(p => p.Avaliacoes)
                .FirstOrDefaultAsync(p => p.Username == username);

            if (passeador == null)
                return NotFound();

            return Ok(passeador);
        }

        [HttpPut("{username}")]
public async Task<ActionResult> AtualizarPorUsername(string username, [FromBody] Passeador passeadorAtualizado)
{
    var passeador = await _context.Passeadores
        .FirstOrDefaultAsync(p => p.Username == username);

    if (passeador == null)
        return NotFound("Passeador não encontrado");

    passeador.Nome = passeadorAtualizado.Nome;
    passeador.Email = passeadorAtualizado.Email;
    passeador.Descricao = passeadorAtualizado.Descricao;
    passeador.Curiosidades = passeadorAtualizado.Curiosidades;
    passeador.Preco = passeadorAtualizado.Preco;
    passeador.Cidade = passeadorAtualizado.Cidade;
    passeador.Estado = passeadorAtualizado.Estado;
    if (!string.IsNullOrEmpty(passeadorAtualizado.Foto))
        passeador.Foto = passeadorAtualizado.Foto;

    await _context.SaveChangesAsync();
    return Ok(passeador);
}


    }
}