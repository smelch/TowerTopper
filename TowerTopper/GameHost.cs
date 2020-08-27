using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TowerTopper.Application.Games;
using TowerTopper.Application.Mediator;
using TowerTopper.Domain.Games;

namespace TowerTopper
{
    public class GameHost : IHostedService
    {
        private readonly IEventHub _eventHub;
        private readonly IPersistGame _persister;
        private readonly List<Game> _games;
        private readonly ReaderWriterLock _lock = new ReaderWriterLock();
        private Timer _timer;

        public GameHost(IEventHub eventHub, IPersistGame persister)
        {
            _eventHub = eventHub;
            _persister = persister;
            _games = new List<Game>();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(Tick, null, 0, 30);
            return Task.CompletedTask;
        }

        private async void Tick(object state)
        {
            _lock.AcquireReaderLock(-1);
            await Task.WhenAll(_games.Select(async game => {
                game.Tick();
                await _persister.TryStore(game);
                await _eventHub.DispatchAll(game);
            }));
            _lock.ReleaseReaderLock();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer.Change(0, 0);
            return Task.CompletedTask;
        }

        public void AddGame(Game game)
        {
            _lock.AcquireWriterLock(-1);
            _games.Add(game);
            _lock.ReleaseWriterLock();
        }

        public void RemoveGame(Game game)
        {
            _lock.AcquireWriterLock(-1);
            _games.Remove(game);
            _lock.ReleaseWriterLock();
        }
    }
}
