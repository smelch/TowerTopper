using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Domain.Characters;
using TowerTopper.Domain.Players;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Rooms
{
    public class RoomCreator : ICommandHandler<CreateRoom>
    {
        private readonly IEventHub _eventHub;
        private readonly IPersistRooms _persister;

        public RoomCreator(IEventHub eventHub, IPersistRooms persister)
        {
            _eventHub = eventHub;
            _persister = persister;
        }

        public async Task Handle(CreateRoom command)
        {
            Room room;
            var playerId = new PlayerId(command.HostPlayerId);
            do {
                room = Room.CreateRoom(playerId, command.HostPlayerName, CharacterKey.Parse(command.SelectedCharacter));
            }
            while (!(await _persister.TryStore(room)));

            await _eventHub.DispatchAll(room);
        }
    }
}
