using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Characters;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class RoomCreatedEvent
    {
        public RoomId RoomId { get; }
        public RoomCode RoomCode { get; }
        public PlayerId HostPlayerId { get; }
        public CharacterKey HostCharacterKey { get; }

        public RoomCreatedEvent(RoomId roomId, RoomCode roomCode, PlayerId hostPlayerId, CharacterKey hostCharacterKey)
        {
            RoomId = roomId;
            RoomCode = roomCode;
            HostPlayerId = hostPlayerId;
            HostCharacterKey = hostCharacterKey;
        }
    }
}
