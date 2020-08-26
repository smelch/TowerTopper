using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class RoomCreatedEvent
    {
        public RoomId RoomId { get; }
        public RoomCode RoomCode { get; }
        public PlayerId HostPlayerId { get; }

        public RoomCreatedEvent(RoomId roomId, RoomCode roomCode, PlayerId hostPlayerId)
        {
            RoomId = roomId;
            RoomCode = roomCode;
            HostPlayerId = hostPlayerId;
        }
    }
}
