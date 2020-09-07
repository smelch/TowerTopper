using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Commands
{
    public class JoinRoom
    {
        public string UserName { get; set; }
        public string RoomCode { get; set; }
        public string PlayerId { get; set; }
        public string SelectedCharacter { get; set; }
    }
}
