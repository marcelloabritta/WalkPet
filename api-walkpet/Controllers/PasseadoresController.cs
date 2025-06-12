using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Data;
using API.Models;
using API.DTO;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/passeadores")]
    public class PasseadoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public PasseadoresController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PasseadorDTO>>> GetTodos()
        {
            var passeadores = await _context.Passeadores
                .Include(p => p.Avaliacoes)
                .ToListAsync();

            var passeadoresDTO = passeadores.Select(p => new PasseadorDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Username = p.Username,
                Email = p.Email,
                Descricao = p.Descricao,
                Curiosidades = p.Curiosidades,
                Cidade = p.Cidade,
                Estado = p.Estado,
                Distancia = p.Distancia,
                Preco = p.Preco,
                Foto = p.Foto,
                Avaliacoes = p.Avaliacoes
            }).ToList();

            return Ok(passeadoresDTO);
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

            passeador.Senha = _authService.HashPassword(passeador.Senha);

            _context.Passeadores.Add(passeador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodos), new { id = passeador.Id }, passeador);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<PasseadorDTO>> GetPorUsername(string username)
        {
            var passeador = await _context.Passeadores
                .Include(p => p.Avaliacoes)
                .FirstOrDefaultAsync(p => p.Username == username);

            if (passeador == null)
                return NotFound("Passeador não encontrado");

            var passeadorDTO = new PasseadorDTO
            {
                Id = passeador.Id,
                Nome = passeador.Nome,
                Username = passeador.Username,
                Email = passeador.Email,
                Descricao = passeador.Descricao,
                Curiosidades = passeador.Curiosidades,
                Cidade = passeador.Cidade,
                Estado = passeador.Estado,
                Distancia = passeador.Distancia,
                Preco = passeador.Preco,
                Foto = passeador.Foto,
                Avaliacoes = passeador.Avaliacoes
            };

            return Ok(passeadorDTO);
        }

        [HttpPut("{username}")]
        [Authorize] 
        public async Task<ActionResult> AtualizarPorUsername(string username, [FromBody] AtualizarPasseadorDTO dadosAtualizacao)
        {

            var currentUsername = User.Identity.Name;
            if (currentUsername != username)
            {
                return Forbid("Você não pode editar este perfil");
            }

            var passeador = await _context.Passeadores
                .FirstOrDefaultAsync(p => p.Username == username);

            if (passeador == null)
                return NotFound("Passeador não encontrado");

            if (!string.IsNullOrEmpty(dadosAtualizacao.Nome))
                passeador.Nome = dadosAtualizacao.Nome;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Email))
                passeador.Email = dadosAtualizacao.Email;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Descricao))
                passeador.Descricao = dadosAtualizacao.Descricao;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Curiosidades))
                passeador.Curiosidades = dadosAtualizacao.Curiosidades;

            if (dadosAtualizacao.Preco.HasValue && dadosAtualizacao.Preco > 0)
                passeador.Preco = dadosAtualizacao.Preco.Value;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Cidade))
                passeador.Cidade = dadosAtualizacao.Cidade;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Estado))
                passeador.Estado = dadosAtualizacao.Estado;

            if (!string.IsNullOrEmpty(dadosAtualizacao.Foto))
                passeador.Foto = dadosAtualizacao.Foto;

            await _context.SaveChangesAsync();
            return Ok(passeador);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequest login)
        {
            var passeador = await _context.Passeadores
                .Include(p => p.Avaliacoes)
                .FirstOrDefaultAsync(p => p.Username == login.Username);

            if (passeador == null)
                return Unauthorized("Usuário não encontrado");

            // Verificar senha com hash
            if (!_authService.VerifyPassword(login.Senha, passeador.Senha))
                return Unauthorized("Senha incorreta");

            // Gerar token JWT
            var token = _authService.GenerateJwtToken(passeador);

            var passeadorDTO = new PasseadorDTO
            {
                Id = passeador.Id,
                Nome = passeador.Nome,
                Username = passeador.Username,
                Email = passeador.Email,
                Descricao = passeador.Descricao,
                Curiosidades = passeador.Curiosidades,
                Cidade = passeador.Cidade,
                Estado = passeador.Estado,
                Distancia = passeador.Distancia,
                Preco = passeador.Preco,
                Foto = passeador.Foto,
                Avaliacoes = passeador.Avaliacoes
            };

            return Ok(new LoginResponseDTO
            {
                Token = token,
                Passeador = passeadorDTO,
                ExpiresAt = DateTime.Now.AddHours(24)
            });
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {

            return Ok(new { message = "Logout realizado com sucesso" });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<PasseadorDTO>> GetCurrentUser()
        {
            var username = User.Identity.Name;
            var passeador = await _context.Passeadores
                .Include(p => p.Avaliacoes)
                .FirstOrDefaultAsync(p => p.Username == username);

            if (passeador == null)
                return NotFound("Usuário não encontrado");

            var passeadorDTO = new PasseadorDTO
            {
                Id = passeador.Id,
                Nome = passeador.Nome,
                Username = passeador.Username,
                Email = passeador.Email,
                Descricao = passeador.Descricao,
                Curiosidades = passeador.Curiosidades,
                Cidade = passeador.Cidade,
                Estado = passeador.Estado,
                Distancia = passeador.Distancia,
                Preco = passeador.Preco,
                Foto = passeador.Foto,
                Avaliacoes = passeador.Avaliacoes
            };

            return Ok(passeadorDTO);
        }
    }
}