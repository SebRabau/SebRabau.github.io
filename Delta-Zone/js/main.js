var DeltaZone = DeltaZone || {}; //Use existing DeltaZone, or make new object
DeltaZone.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "");

DeltaZone.game.state.add("Boot", DeltaZone.Boot);
DeltaZone.game.state.add("Preload", DeltaZone.Preload);
DeltaZone.game.state.add("MainMenu", DeltaZone.MainMenu);
DeltaZone.game.state.add("Game", DeltaZone.Game);
DeltaZone.game.state.add("Lose", DeltaZone.Lose);

DeltaZone.game.state.start("Boot");