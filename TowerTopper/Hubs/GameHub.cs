using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Domain.Players;

namespace TowerTopper.Hubs
{
    public class GameHub : Hub<GameHub>
    {
        private readonly ICommandBroker _commandBroker;

        public GameHub(ICommandBroker commandBroker)
        {
            _commandBroker = commandBroker;
        }

        public Task CreateRoom(string userName) =>
            _commandBroker.Execute(new CreateRoom() { HostPlayerName = userName, HostPlayerId = Context.ConnectionId });

        public Task JoinGame(string userName, string roomCode) =>
            _commandBroker.Execute(new JoinGame() { UserName = userName, RoomCode = roomCode });

        public Task SyncRoomData() =>
            _commandBroker.Execute(new SyncRoomData() { PlayerId = Context.ConnectionId });

        public Task PickCharacter(string roomId, string character) =>
            _commandBroker.Execute(new PickCharacter() { RoomId = roomId, Character = character, PlayerId = Context.ConnectionId });
    }
}
