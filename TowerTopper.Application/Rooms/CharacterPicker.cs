using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Domain.Characters;

namespace TowerTopper.Application.Rooms
{
    public class CharacterPicker : ICommandHandler<PickCharacter>
    {
        private readonly IEventHub _eventHub;
        private readonly IPersistRooms _persister;
        private readonly IFetchRoom _fetcher;

        public CharacterPicker(IEventHub eventHub, IFetchRoom fetcher, IPersistRooms persister)
        {
            _eventHub = eventHub;
            _persister = persister;
            _fetcher = fetcher;
        }

        public async Task Handle(PickCharacter command)
        {
            var character = CharacterKey.Parse(command.Character);
        }
    }
}
