using TowerTopper.Domain.Players;

namespace TowerTopper.Domain.Rooms
{
    public class GuestJoinedRoomEvent
    {
        public RoomId RoomId { get; }
        public PlayerId PlayerId { get; }
        public string UserName { get; }

        public GuestJoinedRoomEvent(RoomId roomId, PlayerId playerId, string userName)
        {
            RoomId = roomId;
            PlayerId = playerId;
            UserName = userName;
        }
    }
}