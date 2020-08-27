import GameObject from './GameObject';

class GameHeader extends GameObject {
    myPlayerFillStyle = "#00CC00";
    myPlayerStrokeStyle = "#005500";
    otherPlayerFillStyle = "#AAAA00";
    otherPlayerStrokeStyle = "#000000";

    constructor(props) {
        super({
            updateable: false,
            drawable: true,
            drawOrder: 99,
            updateOrder: 99
        });

        this.position = props.position;
        this.stateSource = props.stateSource;
    }

    draw(elapsedTime, ctx) {
        const roomState = this.stateSource.getRoomState();
        if (roomState) {
            ctx.font = "16pt sans-serif"
            ctx.fillText("ROOM CODE: " + roomState.roomCode, 20, 20);

            ctx.save();
            ctx.fillStyle = (roomState.host.playerId === roomState.myPlayerId) ? this.myPlayerFillStyle : this.otherPlayerFillStyle;
            ctx.fillText(roomState.host.userName, 50, 50);
            ctx.strokeText(roomState.host.userName, 50, 50);
            ctx.restore();

            if (this.guest) {
                ctx.save();
                ctx.fillStyle = (this.guest.playerId === roomState.myPlayerId) ? "#CCFFCC" : "#AAAA00";
                ctx.fillText(this.guest.userName, 300, 40);
                ctx.strokeText(this.guest.userName, 300, 40);
                ctx.restore();
            }
        }
    }
}

export default GameHeader;