using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Domain;

namespace TowerTopper.Application.Mediator
{
    public interface IEventHub
    {
        Task Dispatch<T>(T domainEvent);
        Task DispatchAll(Entity entity);
    }
}
