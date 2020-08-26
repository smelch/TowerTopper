using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Domain
{
    public class Entity
    {
        private List<object> _domainEvents;
        public IEnumerable<object> DomainEvents => _domainEvents;

        protected void AddDomainEvent(object domainEvent)
        {
            _domainEvents ??= new List<object>();
            _domainEvents.Add(domainEvent);
        }

        public void RemoveDomainEvent(object domainEvent)
        {
            _domainEvents?.Remove(domainEvent);
        }
    }
}
