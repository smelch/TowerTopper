import AnimateObject from './AnimateObject'

class CharacterObject extends AnimateObject {
    constructor(game, idle, toss, hit) {
        super(10);
        this.game = game;
        this.addSpriteState('idle', 200, 300, 8, 0.5, idle, 'idle');
        this.addSpriteState('toss', 200, 300, 14, 0.5, toss, 'idle');
        this.addSpriteState('hit', 200, 300, 4, 0.5, hit, 'idle');
    }

    toss() {
        this.changeState('toss');
    }
}

export default CharacterObject