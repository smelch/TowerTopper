using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Domain.Games
{
    public class GameStartedEvent
    {
        public RoomId RoomId { get; }
        public Room.RoomPlayer Host { get; }
        public Room.RoomPlayer Guest { get; }

        public GameStartedEvent(RoomId roomId, Room.RoomPlayer host, Room.RoomPlayer guest)
        {
            RoomId = roomId;
            Host = host;
            Guest = guest;
        }
    }
}
