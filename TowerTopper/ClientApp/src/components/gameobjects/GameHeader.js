import GameObject from 'GameObject';

class GameHeader extends GameObject {
    myPlayerFillStyle = "#CCFFCC";
    otherPlayerFillStyle = "#AAAA00";

    constructor(props) {
        super({
            updateable: false,
            drawable: true
        });

        this.position = props.position;
        this.stateSource = props.stateSource;
    }

    draw(ctx) {
        const roomState = this.stateSource.getRoomState();
        ctx.font = "16pt sans-serif"
        ctx.fillText("ROOM CODE: " + roomState.roomCode, 20, 20);

        ctx.save();
        ctx.fillStyle = (roomState.host.playerId === roomState.myPlayerId) ? this.myPlayerFillStyle : this.otherPlayerFillStyle;
        ctx.fillText(roomState.host.userName, 200, 40);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = (this.guest.playerId === roomState.myPlayerId) ? "#CCFFCC" : "#AAAA00";
        ctx.fillText(this.guest.userName, 300, 40);
        ctx.restore();
    }
}

export default GameHeader;