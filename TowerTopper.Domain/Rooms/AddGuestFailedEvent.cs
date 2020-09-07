using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Domain.Characters;
using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class AddGuestFailedEvent
    {
        public RoomId RoomId { get; }
        public PlayerId PlayerId { get; }
        public string UserName { get; }
        public CharacterKey CharacterKey { get; }

        public AddGuestFailedEvent(RoomId roomId, PlayerId playerId, string userName, CharacterKey characterKey)
        {
            RoomId = roomId;
            PlayerId = playerId;
            UserName = userName;
            CharacterKey = characterKey;
        }
    }
}
