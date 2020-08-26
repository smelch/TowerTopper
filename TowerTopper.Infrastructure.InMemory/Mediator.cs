using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Domain;

namespace TowerTopper.Infrastructure.InMemory
{
    public class Mediator : ICommandBroker, IEventHub
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<Mediator> _logger;

        public Mediator(IServiceProvider serviceProvider, ILogger<Mediator> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public async Task Dispatch<T>(T domainEvent)
        {
            foreach (var service in _serviceProvider.GetServices<IEventHandler<T>>())
            {
                await service.Handle(domainEvent);
            }
        }

        //TODO: Make this better, this is a monstrosity
        public async Task DispatchAll(Entity entity)
        {
            foreach (var domainEvent in entity.DomainEvents.ToArray())
            {
                var generic = this.GetType().GetMethod("Dispatch");
                var method = generic.MakeGenericMethod(domainEvent.GetType());
                await (method.Invoke(this, new[] { domainEvent }) as Task);
                entity.RemoveDomainEvent(domainEvent);
            }
        }

        public Task Execute<T>(T command)
        {
            var handler = _serviceProvider.GetService<ICommandHandler<T>>();
            if (handler == null)
            {
                _logger.LogWarning("No Command Handler registered for command of type {type}", typeof(T));
                return Task.CompletedTask;
            }

            return handler.Handle(command);
        }

    }
}
