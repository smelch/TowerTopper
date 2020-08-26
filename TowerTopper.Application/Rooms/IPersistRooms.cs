using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Rooms
{
    public interface IPersistRooms
    {
        Task<bool> TryStore(Room room);
    }
}
