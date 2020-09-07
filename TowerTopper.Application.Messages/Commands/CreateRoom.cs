using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Commands
{
    public class CreateRoom
    {
        public string HostPlayerName { get; set; }
        public string HostPlayerId { get; set; }
        public string SelectedCharacter { get; set; }
    }
}
