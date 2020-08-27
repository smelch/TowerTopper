using System.Threading.Tasks;
using TowerTopper.Domain.Games;

namespace TowerTopper.Application.Games
{
    public interface IPersistGame
    {
        Task<bool> TryStore(Game game);
    }
}