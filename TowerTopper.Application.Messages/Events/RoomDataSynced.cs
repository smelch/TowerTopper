using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class RoomDataSynced
    {
        public string MyPlayerId { get; set; }
        public string RoomCode { get; set; }
        public RoomPlayer Host { get; set; }
        public RoomPlayer Guest { get; set; }

        public class RoomPlayer
        {
            public string PlayerId { get; set; }
            public string UserName { get; set; }
        }
    }
}
