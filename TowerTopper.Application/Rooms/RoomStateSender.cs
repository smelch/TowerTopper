using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Application.Messages.Events;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Rooms
{
    public class RoomStateSender : ICommandHandler<SendRoomState>
    {
        private readonly IEventHub _eventHub;
        private readonly IFetchRoom _fetcher;

        public RoomStateSender(IEventHub eventHub, IFetchRoom fetcher)
        {
            _eventHub = eventHub;
            _fetcher = fetcher;
        }

        public async Task Handle(SendRoomState command)
        {
            var room = await _fetcher.Fetch(RoomId.Parse(command.RoomId));
            if (room != null)
            {
                await _eventHub.Dispatch(new RoomStateGenerated()
                {
                    MyPlayerId = command.PlayerId,
                    RoomCode = room.RoomCode.ToString(),
                    Status = room.Status.ToString(),
                    Guest = Convert(room.Guest),
                    Host = Convert(room.Host)
                });
            }
        }

        private RoomStateGenerated.RoomPlayer Convert(Room.RoomPlayer player)
        {
            if (player == null)
            {
                return null;
            }

            return new RoomStateGenerated.RoomPlayer()
            {
                PlayerId = player.PlayerId.ToString(),
                UserName = player.UserName,
                CharacterKey = player.SelectedCharacter?.ToString()
            };
        }
    }
}
