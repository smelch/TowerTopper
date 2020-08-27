using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Application.Rooms;
using TowerTopper.Domain.Games;
using TowerTopper.Domain.Players;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Games
{
    public class GameStarter : ICommandHandler<StartGame>
    {
        private readonly IEventHub _eventHub;
        private readonly IFetchRoom _roomFetcher;
        private readonly IPersistRooms _persister;

        public GameStarter(IEventHub eventHub, IFetchRoom roomFetcher, IPersistRooms persister)
        {
            _eventHub = eventHub;
            _roomFetcher = roomFetcher;
            _persister = persister;
        }

        public async Task Handle(StartGame command)
        {
            var room = await _roomFetcher.Fetch(RoomId.Parse(command.RoomId));
            if (room != null)
            {
                room.StartGame(new PlayerId(command.PlayerId));
                await _persister.TryStore(room);
                await _eventHub.DispatchAll(room);
            }
        }
    }
}
