using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Application.Messages.Events
{
    public class WalkStarted
    {
        public int Facing { get; set; }
        public string PlayerId { get; set; }
        public DateTime Time { get; set; }
    }
}
