using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Commands
{
    public class PickCharacter
    {
        public string RoomId { get; set; }
        public string PlayerId { get; set; }
        public string Character { get; set; }
    }
}
