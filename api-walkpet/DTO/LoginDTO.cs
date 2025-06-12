namespace API.DTO
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Senha { get; set; }
    }

    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public PasseadorDTO Passeador { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}