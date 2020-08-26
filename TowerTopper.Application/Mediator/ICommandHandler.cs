using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TowerTopper.Application.Mediator
{
    public interface ICommandHandler<T>
    {
        Task Handle(T command);
    }
}
