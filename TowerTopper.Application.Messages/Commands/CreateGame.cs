using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Commands
{
    public class CreateGame
    {
        public string HostUserName { get; set; }
        public string HostUserId { get; set; }
    }
}
