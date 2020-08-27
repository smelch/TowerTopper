using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class JoinRoomFailed
    {
        public string PlayerId { get; set; }
        public string Reason { get; set; }
        public string RoomCode { get; set; }
        public string UserName { get; set; }
    }
}
