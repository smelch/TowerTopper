using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TowerTopper.Application.Mediator;
using TowerTopper.Application.Messages.Commands;
using TowerTopper.Application.Messages.Events;
using TowerTopper.Domain.Players;

namespace TowerTopper.Hubs
{
    public class GameHub : Hub
    {
        private readonly ICommandBroker _commandBroker;

        public GameHub(ICommandBroker commandBroker)
        {
            _commandBroker = commandBroker;
        }

        public Task CreateRoom(string userName) =>
            _commandBroker.Execute(new CreateRoom() { HostPlayerName = userName, HostPlayerId = Context.ConnectionId });

        public Task JoinRoom(string userName, string roomCode) =>
            _commandBroker.Execute(new JoinRoom() { UserName = userName, RoomCode = roomCode.ToUpper(), PlayerId = Context.ConnectionId });

        public Task PickCharacter(string roomId, string character) =>
            _commandBroker.Execute(new PickCharacter() { RoomId = roomId, Character = character, PlayerId = Context.ConnectionId });

        public Task StartGame(string roomId) =>
            _commandBroker.Execute(new StartGame() { RoomId = roomId, PlayerId = Context.ConnectionId });

        public Task SendRoomState(string roomId) =>
            _commandBroker.Execute(new SendRoomState() { RoomId = roomId, PlayerId = Context.ConnectionId });

        public Task ThrowCar(string roomId, double time) =>
            Clients.GroupExcept(roomId, Context.ConnectionId).SendAsync("CarThrown", new CarThrown() { PlayerId = Context.ConnectionId, Time = DateTime.UtcNow });

        public Task StartWalk(string roomId, int facing, double time) =>
            Clients.GroupExcept(roomId, Context.ConnectionId).SendAsync("WalkStarted", new WalkStarted() { PlayerId = Context.ConnectionId, Facing = facing, Time = DateTime.UtcNow });

        public Task StopWalk(string roomId, double time) =>
            Clients.GroupExcept(roomId, Context.ConnectionId).SendAsync("WalkStopped", new WalkStopped() { PlayerId = Context.ConnectionId, Time = DateTime.UtcNow });
    }
}
