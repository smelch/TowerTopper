using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Infrastructure.InMemory.Rooms
{
    public class RoomStorage : IRoomStorage
    {
        private readonly ConcurrentDictionary<RoomId, Room> _idIndex;
        private readonly ConcurrentDictionary<RoomCode, Room> _codeIndex;

        public IReadOnlyDictionary<RoomCode, Room> RoomCodeIndex => _codeIndex;
        public IReadOnlyDictionary<RoomId, Room> RoomIdIndex => _idIndex;

        public RoomStorage()
        {
            _idIndex = new ConcurrentDictionary<RoomId, Room>();
            _codeIndex = new ConcurrentDictionary<RoomCode, Room>();
        }

        public bool Add(Room room)
        {
            if(_codeIndex.TryAdd(room.RoomCode, room))
            {
                if(_idIndex.TryAdd(room.RoomId, room))
                {
                    return true;
                    
                }
                _codeIndex.TryRemove(room.RoomCode, out Room _);
            }

            return false;
        }

        public void Remove(RoomId roomId)
        {
            if(_idIndex.TryRemove(roomId, out Room value))
            {
                _codeIndex.TryRemove(value.RoomCode, out Room _);
            }
        }
    }
}
