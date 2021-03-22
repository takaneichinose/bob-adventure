import { Platform, EvtKey } from "./enumerables";
import { Pos } from "./interfaces";
import * as Const from "./constants";
import Map from "./map";

export default class Methods {
	/**
	 * Main character position
	 */
	static alicePos: Pos = {
		x: null,
		y: null
	} as Pos;

	/**
	 * The main playable character
	 */
	static alice: any;

	/**
	 * The ground platform
	 */
	static ground: any;

	/**
	 * The block platform
	 */
	static block: any;

	/**
	 * the lawn platform
	 */
	static lawn: any;

	/**
	 * Last pressed event key
	 */
	static lastEvtKey: EvtKey = EvtKey.Right;

	/**
	 * Get the animation name based on event key
	 * @param evtKey Event key
	 */
	static getAnimationName(evtKey: EvtKey): string {
		return "GameAnimation_" + EvtKey[evtKey];
	}

	/**
	 * Add background data to the canvas
	 * @param obj Phaser create object
	 */
	static addBackground(obj: any): void {
		obj.add.image(400, 300, Const.BACKGROUND);
	}

	/**
	 * Define all the needed platforms for the game
	 * @param obj Phaser create object
	 */
	static definePlatforms(obj: any): void {
		this.block = obj.physics.add.staticGroup();
		this.ground = obj.physics.add.staticGroup();
		this.lawn = obj.physics.add.staticGroup();
	}

	/**
	 * Create the map for the game
	 */
	static createMap(): void {
		for (let i: number = 0; i < Map.length; i++) {
			const row: Array<Platform> = Map[i];

			for (let j: number = 0; j < row.length; j++) {
				const col: Platform = row[j];
				const x: number = (Const.CELL_SIZE / 2) + (j * Const.CELL_SIZE);
				const y: number = (Const.CELL_SIZE / 2) + (i * Const.CELL_SIZE);

				switch (col) {
					case Platform.Alice:
						this.alicePos.x = x;
						this.alicePos.y = y;
						break;
					case Platform.Block:
						this.block.create(x, y, Const.BLOCK);
						break;
					case Platform.Ground:
						this.ground.create(x, y, Const.GROUND);
						break;
					case Platform.Lawn:
						this.lawn.create(x, y, Const.LAWN);
						break;
				}
			}
		}

		// END createMap
	}

	/**
	 * Check if the position of Alice is set
	 */
	static checkAlicePos(): void {
		if (this.alicePos.x === null || this.alicePos.y === null) {
			// If either of the X and Y position is null, throw an error
	
			throw "Must set the 'X' and 'Y' position of the character. Otherwise, the game couldn't be played.";
		}
	}

	/**
	 * Define the character's settings
	 * @param obj Phaser create object
	 */
	static defineAlice(obj: any): void {
		this.alice = obj.physics.add.sprite(this.alicePos.x, this.alicePos.y, Const.ALICE);
		this.alice.setBounce(0.3); // TODO: Test properly; Maybe I wouldn't like this
		this.alice.setCollideWorldBounds(true);
	}

	/**
	 * Define the character's animation settings
	 * @param obj Phaser create object
	 */
	static defineAliceAnimations(obj: any): void {
		// Left
		obj.anims.create({
			key: this.getAnimationName(EvtKey.Left),
			frames: obj.anims.generateFrameNumbers(Const.ALICE, {
				start: 0,
				end: 5,
			}),
			frameRate: 10,
			repeat: -1
		});
	
		// Stop Left
		obj.anims.create({
			key: this.getAnimationName(EvtKey.StopLeft),
			frames: [{
				key: Const.ALICE,
				frame: 6
			}],
			frameRate: 20
		});
	
		// Right
		obj.anims.create({
			key: this.getAnimationName(EvtKey.Right),
			frames: obj.anims.generateFrameNumbers(Const.ALICE, {
				start: 8,
				end: 13
			}),
			frameRate: 10,
			repeat: -1
		});
	
		// Stop Right
		obj.anims.create({
			key: this.getAnimationName(EvtKey.StopRight),
			frames: [{
				key: Const.ALICE,
				frame: 7
			}],
			frameRate: 20
		});
	}

	/**
	 * Define the character's control settings
	 * @param obj Phaser update object
	 */
	static defineAliceControls(obj: any): void {
		const cursors = obj.input.keyboard.createCursorKeys();

		if (cursors.left.isDown) {
			// Left key is pressed
			this.alice.setVelocityX(-60);
			this.alice.anims.play(this.getAnimationName(EvtKey.Left), true);

			this.lastEvtKey = EvtKey.Left;
		} else if (cursors.right.isDown) {
			// Right key is pressed
			this.alice.setVelocityX(60);
			this.alice.anims.play(this.getAnimationName(EvtKey.Right), true);

			this.lastEvtKey = EvtKey.Right;
		} else {
			// Neither left nor right is pressed
			this.alice.setVelocityX(0);

			if (this.lastEvtKey === EvtKey.Left) {
				// Last pressed event key is 'Left' key
				this.alice.anims.play(this.getAnimationName(EvtKey.StopLeft));
			} else if (this.lastEvtKey === EvtKey.Right) {
				// Last pressed event key is 'Right' key
				this.alice.anims.play(this.getAnimationName(EvtKey.StopRight));
			}
		}

		if (cursors.up.isDown && this.alice.body.touching.down) {
			// Up button is pressed and if the character is on the ground
			this.alice.setVelocityY(-200);
		}
	}

	/**
	 * Add the colliders for the character and platforms
	 * @param obj Phaser create object
	 */
	static addColliders(obj: any): void {
		obj.physics.add.collider(this.alice, this.block);
		obj.physics.add.collider(this.alice, this.ground);
		obj.physics.add.collider(this.alice, this.lawn);
	}
}
