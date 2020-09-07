using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Characters;
using TowerTopper.Domain.Games;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class Room : Entity
    {
        public RoomId RoomId { get; }
        public RoomCode RoomCode { get; }
        public RoomPlayer Host { get; }
        public RoomPlayer Guest { get; private set; }
        public RoomStatus Status { get; private set; }

        protected Room(RoomId roomId, RoomCode roomCode, RoomPlayer host)
        {
            RoomId = roomId;
            RoomCode = roomCode;
            Host = host;
            Status = RoomStatus.Waiting;
        }

        public static Room CreateRoom(PlayerId hostPlayerId, string hostUserName, CharacterKey characterKey)
        {
            var room = new Room(RoomId.NewRoomId(), RoomCode.NewRoomCode(), new RoomPlayer(hostPlayerId, hostUserName, characterKey, 0));
            room.AddDomainEvent(new RoomCreatedEvent(room.RoomId, room.RoomCode, hostPlayerId, characterKey));

            return room;
        }

        public void AddGuest(PlayerId playerId, string userName, CharacterKey characterKey)
        {
            if(Guest != null)
            {
                AddDomainEvent(new AddGuestFailedEvent(RoomId, playerId, userName, characterKey));
            }
            else
            {
                Guest = new RoomPlayer(playerId, userName, characterKey, 0);
                AddDomainEvent(new GuestJoinedRoomEvent(RoomId, playerId, userName, characterKey));
            }
        }

        public void StartGame(PlayerId playerId)
        {
            Status = RoomStatus.Starting;
            AddDomainEvent(new GameStartedEvent(RoomId, Host, Guest));
        }

        public class RoomPlayer
        {
            public PlayerId PlayerId { get; }
            public string UserName { get; }
            public CharacterKey SelectedCharacter { get; }
            public int Latency { get; }

            public RoomPlayer(PlayerId playerId, string userName, CharacterKey characterKey, int latency)
            {
                PlayerId = playerId;
                UserName = userName;
                SelectedCharacter = characterKey;
            }
        }

        public class RoomStatus
        {
            public static RoomStatus Waiting = new RoomStatus("waiting");
            public static RoomStatus Starting = new RoomStatus("starting");
            public static RoomStatus Started = new RoomStatus("started");
            public static RoomStatus Over = new RoomStatus("over");

            private readonly string _value;
            private RoomStatus(string value)
            {
                _value = value;
            }

            public override string ToString()
            {
                return _value;
            }
        }
    }
}
