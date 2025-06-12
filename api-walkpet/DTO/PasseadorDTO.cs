using API.Models;
using System.Collections.Generic;
using System.Linq;

namespace API.DTO
{
    public class PasseadorDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Descricao { get; set; }
        public string Curiosidades { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Distancia { get; set; }
        public decimal Preco { get; set; }
        public string Foto { get; set; }
        
        public ICollection<Avaliacao> Avaliacoes { get; set; }
        
        // Média das avaliações
        public decimal MediaEstrelas => 
            Avaliacoes?.Any() == true
                ? Convert.ToDecimal(Avaliacoes.Average(a => (double)a.Estrelas))
                : 0;
                
        // Total de avaliações
        public int TotalAvaliacoes => Avaliacoes?.Count ?? 0;
    }
}