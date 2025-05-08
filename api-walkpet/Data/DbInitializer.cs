using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using API.Data;
using API.Models;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {

        if (!context.Passeadores.Any())
        {
            var passeadores = new[]
            {
                new Passeador
                {
                    Nome = "Maria Silva",
                    Cpf = "123.456.789-01",
                    Username = "maria.silva",
                    Email = "maria.silva@example.com",
                    Senha = "senha123",
                    Descricao = "Passeadora experiente com amor por animais.",
                    Curiosidades = "Curiosidades sobre Maria que a tornam única na sua profissão.",
                    Cidade = "Belo Horizonte",
                    Estado = "MG",
                    Distancia = "3,2 km de distância",
                    Preco = 20,
                    Foto = "/Maria.png",
                    Avaliacoes = new[]
                    {
                        new Avaliacao { NomeAvaliador = "Cliente 1", Comentario = "Muito atenciosa e cuidadosa com meu pet.", Estrelas = 5, Data = new DateTime(2023, 1, 10) },
                        new Avaliacao { NomeAvaliador = "Cliente 2", Comentario = "Excelente serviço!", Estrelas = 4, Data = new DateTime(2023, 2, 15) }
                    }.ToList()
                },
                new Passeador
                {
                    Nome = "João Oliveira",
                    Cpf = "987.654.321-09",
                    Username = "joao.oliveira",
                    Email = "joao.oliveira@example.com",
                    Senha = "senha456",
                    Descricao = "Amo cães e caminhadas ao ar livre.",
                    Curiosidades = "João adora explorar novos parques e trilhas em suas caminhadas.",
                    Cidade = "Belo Horizonte",
                    Estado = "MG",
                    Distancia = "1km de distância",
                    Preco = 15,
                    Foto = "/Joao.png",
                    Avaliacoes = new[]
                    {
                        new Avaliacao { NomeAvaliador = "Cliente 3", Comentario = "Super recomendo!", Estrelas = 5, Data = new DateTime(2023, 3, 20) }
                    }.ToList()
                },
                new Passeador
                {
                    Nome = "Ana Costa",
                    Cpf = "159.753.846-22",
                    Username = "ana.costa",
                    Email = "ana.costa@example.com",
                    Senha = "senha789",
                    Descricao = "Profissional dedicada e confiável.",
                    Curiosidades = "Ana tem um interesse especial por cuidar de pets com necessidades especiais.",
                    Cidade = "Belo Horizonte",
                    Estado = "MG",
                    Distancia = "8,6 km de distância",
                    Preco = 12,
                    Foto = "/Ana.png",
                    Avaliacoes = new[]
                    {
                        new Avaliacao { NomeAvaliador = "Cliente 4", Comentario = "Atenciosa e pontual.", Estrelas = 4, Data = new DateTime(2023, 4, 25) }
                    }.ToList()
                },
                new Passeador
                {
                    Nome = "Paulo Silva",
                    Cpf = "258.456.357-11",
                    Username = "paulo.silva",
                    Email = "paulo.silva@example.com",
                    Senha = "senha2024",
                    Descricao = "Amo pets e passear com eles é minha paixão",
                    Curiosidades = "Paulo também é voluntário em um abrigo de animais durante seus finais de semana.",
                    Cidade = "Belo Horizonte",
                    Estado = "MG",
                    Distancia = "6 km de distância",
                    Preco = 11,
                    Foto = "/Paulo.png",
                    Avaliacoes = new[]
                    {
                        new Avaliacao { NomeAvaliador = "Cliente 5", Comentario = "Fez um ótimo trabalho com meus dois labradores.", Estrelas = 4, Data = new DateTime(2023, 5, 30) },
                        new Avaliacao { NomeAvaliador = "Cliente 6", Comentario = "Esqueceu de alimentar meu pet, porém ele voltou bem feliz", Estrelas = 3, Data = new DateTime(2023, 5, 30) }
                    }.ToList()
                }
            };

            context.Passeadores.AddRange(passeadores);
            context.SaveChanges();
        }
    }
}