import GameObject from 'GameObject';

class GameHeader extends GameObject {
    constructor() {
        super({
            updates: false,
            draws: true
        });
    }

    
}

export default GameHeader;