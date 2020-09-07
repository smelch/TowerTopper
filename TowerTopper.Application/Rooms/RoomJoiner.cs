using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Application.Messages.Events;
using TowerTopper.Domain.Characters;
using TowerTopper.Domain.Players;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Rooms
{
    public class RoomJoiner : ICommandHandler<JoinRoom>
    {
        private readonly IEventHub _eventHub;
        private readonly IPersistRooms _persister;
        private readonly IFetchRoom _fetcher;

        public RoomJoiner(IEventHub eventHub, IFetchRoom fetcher, IPersistRooms persister)
        {
            _eventHub = eventHub;
            _persister = persister;
            _fetcher = fetcher;
        }

        public async Task Handle(JoinRoom command)
        {
            if (RoomCode.TryParse(command.RoomCode, out RoomCode code, out string error))
            {
                var room = await _fetcher.Fetch(code);
                if (room == null)
                {
                    await _eventHub.Dispatch(new JoinRoomFailed()
                    {
                        PlayerId = command.PlayerId,
                        RoomCode = command.RoomCode,
                        UserName = command.UserName,
                        Reason = "Room not found"
                    });
                } else
                {
                    room.AddGuest(new PlayerId(command.PlayerId), command.UserName, CharacterKey.Parse(command.SelectedCharacter));
                    await _persister.TryStore(room);
                    await _eventHub.DispatchAll(room);
                }
            }
            else
            {
                await _eventHub.Dispatch(new JoinRoomFailed()
                {
                    PlayerId = command.PlayerId,
                    RoomCode = command.RoomCode,
                    UserName = command.UserName,
                    Reason = error
                });
            }
        }
    }
}
