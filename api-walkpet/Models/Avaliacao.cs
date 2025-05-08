using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Avaliacao
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O Nome do Avaliador é obrigatório.")]
        public string NomeAvaliador { get; set; }
         [Required(ErrorMessage = "O Comentário é obrigatório.")]
        [StringLength(1000, ErrorMessage = "O Comentário não pode ter mais de 1000 caracteres.")]
        public string Comentario { get; set; }
        [Required(ErrorMessage = "A quantidade de Estrelas é obrigatória.")]
        [Range(1, 5, ErrorMessage = "As Estrelas devem estar entre 1 e 5.")]
        public int Estrelas {    get; set; }
        public DateTime Data { get; set; }
        [ForeignKey ("Passeador")]
        public int PasseadorId { get; set; }
        public Passeador Passeador { get; set; }    
    }

}