using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class GuestJoinedRoom
    {
        public string RoomId { get; set; }
        public string PlayerId { get; set; }
        public string UserName { get; set; }
        public string CharacterKey { get; set; }
    }
}
