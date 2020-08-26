using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Domain.Players
{
    public class Player : Entity
    {
        public PlayerId PlayerId { get; }
        public RoomId RoomId { get; }
    }
}
