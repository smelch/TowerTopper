using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class Room : Entity
    {
        public RoomId RoomId { get; }
        public RoomCode RoomCode { get; }
        public RoomPlayer Host { get; }
        public RoomPlayer Guest { get; private set; }

        protected Room(RoomId roomId, RoomCode roomCode, RoomPlayer host)
        {
            RoomId = roomId;
            RoomCode = roomCode;
            Host = host;
        }

        public static Room CreateRoom(PlayerId hostPlayerId, string hostUserName)
        {
            var room = new Room(RoomId.NewRoomId(), RoomCode.NewRoomCode(), new RoomPlayer(hostPlayerId, hostUserName));
            room.AddDomainEvent(new RoomCreatedEvent(room.RoomId, room.RoomCode, hostPlayerId));

            return room;
        }

        public void AddGuest(PlayerId playerId, string userName)
        {
            if(Guest != null)
            {
                AddDomainEvent(new AddGuestFailedEvent(RoomId, playerId, userName));
            }
            else
            {
                Guest = new RoomPlayer(playerId, userName);
                AddDomainEvent(new GuestJoinedRoomEvent(RoomId, playerId, userName));
            }
        }

        public class RoomPlayer
        {
            public PlayerId PlayerId { get; }
            public string UserName { get; }

            public RoomPlayer(PlayerId playerId, string userName)
            {
                PlayerId = playerId;
                UserName = userName;
            }
        }
    }
}
