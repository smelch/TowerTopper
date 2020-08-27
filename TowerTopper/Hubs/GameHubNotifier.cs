using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TowerTopper.Application.Events;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Events;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Hubs
{
    public class GameHubNotifier :
        IEventHandler<RoomCreatedEvent>,
        IEventHandler<GuestJoinedRoomEvent>,
        IEventHandler<RoomStateGenerated>
    {
        private readonly IHubContext<GameHub> _gameHubContext;

        public GameHubNotifier(IHubContext<GameHub> gameHubContext)
        {
            _gameHubContext = gameHubContext;
        }

        public async Task Handle(RoomCreatedEvent @event)
        {
            await _gameHubContext.Groups.AddToGroupAsync(@event.HostPlayerId.ToString(), @event.RoomId.ToString());
            await _gameHubContext.Clients.Client(@event.HostPlayerId.ToString())?.SendAsync("RoomCreated", ApplicationEvent.FromDomainEvent(@event));
        }

        public async Task Handle(GuestJoinedRoomEvent @event)
        {
            await _gameHubContext.Groups.AddToGroupAsync(@event.PlayerId.ToString(), @event.RoomId.ToString());
            await _gameHubContext.Clients.Group(@event.RoomId.ToString()).SendAsync("GuestJoinedRoom", ApplicationEvent.FromDomainEvent(@event));
        }

        public Task Handle(RoomStateGenerated @event)
        {
            return _gameHubContext.Clients.Client(@event.MyPlayerId).SendAsync("RoomStateGenerated", @event);
        }
    }
}
