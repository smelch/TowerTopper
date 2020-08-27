using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Domain.Games
{
    public class Game : Entity
    {
        //protected Game(Guid id, string name, PlayerId hostPlayerId)
        //{
        //    Id = id;
        //    Name = name;
        //    HostPlayerId = hostPlayerId;

        //    _players = new List<GamePlayer>();
        //}

        //public static Game CreateNew(string name, PlayerId hostPlayerId)
        //{
        //    var game = new Game(Guid.NewGuid(), name, hostPlayerId);
        //    game.AddDomainEvent(new GameCreatedEvent(game.Id, game.Name));

        //    return game;
        //}

        public void Tick()
        {

        }
    }
}
