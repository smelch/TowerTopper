using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class WalkStopped
    {
        public string PlayerId { get; set; }
        public DateTime Time { get; set; }
    }
}
