using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TowerTopper.Application.Mediator
{
    public interface IEventHandler<T>
    {
        Task Handle(T @event);
    }
}
