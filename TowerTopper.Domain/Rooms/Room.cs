using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class Room : Entity
    {
        public RoomId RoomId { get; }
        public RoomCode RoomCode { get; }
        public PlayerId HostPlayerId { get; }

        protected Room(RoomId roomId, RoomCode roomCode, PlayerId hostPlayerId)
        {
            RoomId = roomId;
            RoomCode = roomCode;
            HostPlayerId = hostPlayerId;
        }

        public static Room CreateRoom(PlayerId hostPlayerId)
        {
            var room = new Room(RoomId.NewRoomId(), RoomCode.NewRoomCode(), hostPlayerId);
            room.AddDomainEvent(new RoomCreatedEvent(room.RoomId, room.RoomCode, hostPlayerId));

            return room;
        }
    }
}
