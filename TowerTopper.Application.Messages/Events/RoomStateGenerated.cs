using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class RoomStateGenerated
    {
        public string MyPlayerId { get; set; }
        public string RoomCode { get; set; }
        public string Status { get; set; }
        public RoomPlayer Host { get; set; }
        public RoomPlayer Guest { get; set; }

        public class RoomPlayer
        {
            public string PlayerId { get; set; }
            public string UserName { get; set; }
            public string CharacterKey { get; set; }
        }
    }
}
