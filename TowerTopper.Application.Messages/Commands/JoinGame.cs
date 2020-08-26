using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Commands
{
    public class JoinGame
    {
        public string UserName { get; set; }
        public string RoomCode { get; set; }
    }
}
