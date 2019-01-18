var DeltaZone = DeltaZone || {};

DeltaZone.Preload = function(){};

DeltaZone.Preload.prototype = {
    preload: function() {
        this.splash = this.add.sprite(this.game.world.centerX, 50, "logo"); 
        this.splash.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, "preloadBar");
        this.preloadBar.anchor.setTo(0.5); 
        this.load.setPreloadSprite(this.preloadBar);
        
        //Load Sprites
        this.load.tilemap("map", "maps/DeltaZone.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("tiles", "maps/tiles.png");
        this.load.image("stars", "assets/stars.png");
        this.load.image("instructions", "assets/instructions.png");
        this.load.image("pill", "assets/Pill.png");
        this.load.image("lose", "assets/Lose.png");
        this.load.image("bullet", "assets/Bullet.png");
        this.load.image("enemy", "assets/Enemy.png");
        this.load.image("blank", "assets/blank.png");
        this.load.image("particle", "assets/Particle.png");
        this.load.spritesheet("objectTiles", "maps/tiles.png", 32, 32, 48);
        this.load.spritesheet("player", "assets/Player.png", 55, 70, 4);
        this.load.spritesheet("healthBar", "assets/HealthBar10.png", 150, 32, 10);
        this.load.spritesheet("PlayAgainBTN", "assets/button_play-again.png", 152, 40, 3);
        this.load.spritesheet("menuButtons", "assets/menuButtons.png", 200, 50, 12);
        
        //Load Audio
        this.load.audio("MenuMusic", "assets/Chiptune_Throne_Room.mp3");
        this.load.audio("GameMusic", "assets/Crimson_Nights_Track_02.mp3");
        this.load.audio("collect", "assets/collect.mp3");
        this.load.audio("loseLife", "assets/Loselife.mp3");
        this.load.audio("shoot", "assets/shoot.mp3");
        this.load.audio("splat", "assets/Splat.mp3");
        this.load.audio("explode", "assets/explode.mp3");
    },
    create: function() {
        this.state.start("MainMenu");
    }
};