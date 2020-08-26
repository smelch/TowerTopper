using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Rooms;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Infrastructure.InMemory.Rooms
{
    public class RoomRepository : IPersistRooms
    {
        private readonly IRoomStorage _storage;

        public RoomRepository(IRoomStorage roomStorage)
        {
            _storage = roomStorage;
        }

        public Task<bool> TryStore(Room room)
        {
            return Task.FromResult(_storage.Add(room));
        }
    }
}
