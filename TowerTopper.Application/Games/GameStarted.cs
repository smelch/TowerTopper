using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Domain.Games;

namespace TowerTopper.Application.Games
{
    public class GameCreator : IEventHandler<GameStartedEvent>
    {
        public Task Handle(GameStartedEvent @event)
        {
            return Task.CompletedTask;
        }
    }
}
