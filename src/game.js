var game = new Phaser.Game(320, 288, Phaser.AUTO, 'welcome', {preload: preload, create: create, update: update});
			function preload() {
				this.game.scale.pageAlignHorizontally = true;
				this.game.scale.pageAlignVertically = true;
				//game.load.image('sky', 'assets/sky.png');
				//game.load.spritesheet('dude', 'assets/dude.png');
			}
			var platforms;
			function create() {
				game.stage.backgroundColor = "#7D8C54";
				//game.add.sprite(0, 0, 'star');
				//game.physics.startSystem(Phaser.Physics.ARCADE);

				// A simple background for our game
				//game.add.sprite(0, 0, 'sky');

				// The platforms group contains the ground and the 2 ledges we can jump on
				//platforms = game.add.group();

				// We will enable physics for any object that is created in this group
				//platforms.enableBody = true;

				// Here we create the ground.
				//var ground = platforms.create(0, game.world.height - 64, 'ground');

				// Scale it to fit the width of the game (the original sprite is 400x32 in size)
				//ground.scale.setTo(2, 2);

				// This stops it from falling away when you jump on it
				//ground.body.immovable = true;
			}
			function update() {}