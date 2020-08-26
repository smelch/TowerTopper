using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class RoomCreated
    {
        public string HostPlayerId { get; set; }
        public string RoomCode { get; set; }
        public string RoomId { get; set; }
    }
}
