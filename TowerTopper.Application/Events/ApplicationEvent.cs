using System;
using System.Collections.Generic;
using System.Text;
using TowerTopper.Application.Messages.Events;
using TowerTopper.Domain.Rooms;

namespace TowerTopper.Application.Events
{
    public static class ApplicationEvent
    {
        public static RoomCreated FromDomainEvent(RoomCreatedEvent domainEvent)
        {
            return new RoomCreated
            {
                HostPlayerId = domainEvent.HostPlayerId.ToString(),
                RoomCode = domainEvent.RoomCode.ToString(),
                RoomId = domainEvent.RoomId.ToString()
            };
        }
    }
}
