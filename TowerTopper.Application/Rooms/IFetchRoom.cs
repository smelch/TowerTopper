using System.Threading.Tasks;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Rooms
{
    public interface IFetchRoom
    {
        Task<Room> Fetch(RoomCode roomCode);
    }
}