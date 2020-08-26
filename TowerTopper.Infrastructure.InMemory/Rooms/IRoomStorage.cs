using System.Collections.Generic;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Infrastructure.InMemory.Rooms
{
    public interface IRoomStorage
    {
        IReadOnlyDictionary<RoomCode, Room> RoomCodeIndex { get; }
        IReadOnlyDictionary<RoomId, Room> RoomIdIndex { get; }
        bool Add(Room room);
        void Remove(RoomId roomId);
    }
}