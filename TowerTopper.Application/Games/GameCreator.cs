using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;

namespace TowerTopper.Application.Games
{
    //public class GameCreator : ICommandHandler<CreateGame>
    //{
    //    private readonly IEventHub _eventHub;
    //    private readonly IPersistGame _persister;

    //    public GameCreator(IEventHub eventHub, IPersistGame persister)
    //    {
    //        _eventHub = eventHub;
    //        _persister = persister;
    //    }

    //    public Task Handle(CreateGame command)
    //    {
    //        var game = Game.CreateNew(command., new PlayerId(command.HostPlayerId));
    //        await _storer.Store(game);
    //        await _eventHub.DispatchAll(game);
    //    }
    //}
}
