    using System.ComponentModel.DataAnnotations;

    namespace API.Models
    {
        public class Passeador
        {
            [Key]
            public int Id { get; set; }
            
            [Required(ErrorMessage = "O Nome é obrigatório.")]
            public string Nome { get; set; }
            [Required(ErrorMessage = "O CPF é obrigatório.")]
            public string Cpf { get; set; }
            [Required(ErrorMessage = "O nome de usuario é obrigatório.")]
            public string Username { get; set; }
            [Required(ErrorMessage = "O Email é obrigatória.")]
            public string Email { get; set; }
            [Required(ErrorMessage = "A senha é obrigatória.")]
            public string Senha { get; set; }
            [Required(ErrorMessage = "A descrição é obrigatória.")]
            public string Descricao { get; set; }
            [Required(ErrorMessage = "As curiosidades são obrigatórias.")]        
            public string Curiosidades { get; set; }
            [Required(ErrorMessage = "A cidade é obrigatória.")]     
            public string Cidade { get; set; }
            [Required(ErrorMessage = "O Estado é obrigatório.")]   
            public string Estado { get; set; }
            public string Distancia { get; set; }
            [Required(ErrorMessage = "O preço é obrigatório.")]   
            public decimal Preco { get; set; }
            [Required(ErrorMessage = "A foto é obrigatória.")]   
            public string Foto { get; set; }
            public List<Avaliacao> Avaliacoes { get; set; } = new();
        }
    }