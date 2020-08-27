using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Rooms;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Infrastructure.InMemory.Rooms
{
    public class RoomFetcher : IFetchRoom
    {
        private readonly IRoomStorage _storage;

        public RoomFetcher(IRoomStorage storage)
        {
            _storage = storage;
        }

        public Task<Room> Fetch(RoomCode roomCode)
        {
            _storage.RoomCodeIndex.TryGetValue(roomCode, out Room room);
            return Task.FromResult(room);
        }

        public Task<Room> Fetch(RoomId roomId)
        {
            _storage.RoomIdIndex.TryGetValue(roomId, out Room room);
            return Task.FromResult(room);
        }
    }
}
