import GameObject from './GameObject';
import { Point } from './Coordinates';

class GameHeader extends GameObject {
    myPlayerFillStyle = "#00CC00";
    myPlayerStrokeStyle = "#005500";
    otherPlayerFillStyle = "#CC0000";
    otherPlayerStrokeStyle = "#550000";

    constructor(game, position, props) {
        super(game, position, {
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
            ctx.font = "24pt sans-serif"
            // ctx.fillText("ROOM CODE: " + roomState.roomCode, 20, 340);

            ctx.save();
            ctx.fillStyle = (roomState.host.playerId === roomState.myPlayerId) ? this.myPlayerFillStyle : this.otherPlayerFillStyle;
            ctx.fillText(roomState.host.userName, 50, 50);
            ctx.strokeText(roomState.host.userName, 50, 50);
            ctx.restore();

            if (roomState.guest) {
                ctx.save();
                ctx.fillStyle = (roomState.guest.playerId === roomState.myPlayerId) ? this.myPlayerFillStyle : this.otherPlayerFillStyle;
                const size = ctx.measureText(roomState.guest.userName);
                ctx.fillText(roomState.guest.userName, 590 - size.width, 50);
                ctx.strokeText(roomState.guest.userName, 590 - size.width, 50);
                ctx.restore();
            }
        }
    }
}

export default GameHeader;