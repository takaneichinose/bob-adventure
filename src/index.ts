/////////////////////////////////////
////////// LIBRARY IMPORTS //////////
/////////////////////////////////////

import * as Phaser from "phaser";

///////////////////////////////////
////////// CLASS IMPORTS //////////
///////////////////////////////////

import { Platform } from "./classes/enumerables";
import { Pos } from "./classes/interfaces";
import * as Const from "./classes/constants";
import Map from "./classes/map";

////////////////////////////////////
////////// ASSETS IMPORTS //////////
////////////////////////////////////

import sprAlice from "./images/bob-adventure-alice-sprite.png";

import imgBackground from "./images/bob-adventure-img-background.png";
import imgBlock from "./images/bob-adventure-img-block.png";
import imgGround from "./images/bob-adventure-img-ground.png";
import imgLawn from "./images/bob-adventure-img-lawn.png";

const CELL_SIZE: number = 50;

// The main playable character
let alice: any;

// The obstacles and platforms
let ground: any;
let block: any;
let lawn: any;

// Preload the assets to be used at the game
function preload(): void {
	this.load.image(Const.BACKGROUND, imgBackground);
	this.load.image(Const.BLOCK, imgBlock);
	this.load.image(Const.GROUND, imgGround);
	this.load.image(Const.LAWN, imgLawn);

	// Load the spritesheet of Bob
	this.load.spritesheet(Const.ALICE, sprAlice, {
		frameWidth: 22,
		frameHeight: 32
	});
}

// Create, and place the assets into the canvas
function create(): void {
	// Main character position
	let alicePos: Pos = {
		x: null,
		y: null
	} as Pos;

	//////////////////////
	///// Background /////
	//////////////////////

	// The name must be the same as the one in the preload function
	this.add.image(400, 300, Const.BACKGROUND);

	///////////////////////////////////
	///// Obstacles and Platforms /////
	///////////////////////////////////

	block = this.physics.add.staticGroup();
	ground = this.physics.add.staticGroup();
	lawn = this.physics.add.staticGroup();

	////////////////////////
	///// Map creation /////
	////////////////////////

	for (let i: number = 0; i < Map.length; i++) {
		const row: Array<Platform> = Map[i];

		for (let j: number = 0; j < row.length; j++) {
			const col: Platform = row[j];
			const x: number = (CELL_SIZE / 2) + (j * CELL_SIZE);
			const y: number = (CELL_SIZE / 2) + (i * CELL_SIZE);

			switch (col) {
				case Platform.Alice:
					alicePos.x = x;
					alicePos.y = y;
					break;
				case Platform.Block:
					block.create(x, y, Const.BLOCK);
					break;
				case Platform.Ground:
					ground.create(x, y, Const.GROUND);
					break;
				case Platform.Lawn:
					lawn.create(x, y, Const.LAWN);
					break;
			}
		}
	}

	//////////////////////////
	///// Main character /////
	//////////////////////////

	if (alicePos.x === null || alicePos.y === null) {
		// If either of the X and Y position is null, throw an error

		throw "Must set the 'X' and 'Y' position of the character, otherwise, the game couldn't be played.";
	}

	// Define character settings
	alice = this.physics.add.sprite(alicePos.x, alicePos.y, Const.ALICE);
	alice.setBounce(0.3); // TODO: Test properly; Maybe I wouldn't like this
	alice.setCollideWorldBounds(true);

	this.anims.create({
		key: "left",
		frames: this.anims.generateFrameNumbers(Const.ALICE, {
			start: 0,
			end: 3,
		}),
		frameRate: 10,
		repeat: -1
	});

	// TODO: I'm going to decide if I'm going to add a turn animation
	// this.anims.create({
	// 	key: "turn",
	// 	frames: [{
	// 		key: Const.ALICE,
	// 		frame: 0 // TODO: Change this wherever the turn is located
	// 	}],
	// 	frameRate: 20
	// });

	this.anims.create({
		key: "right",
		frames: this.anims.generateFrameNumbers(Const.ALICE, {
			start: 0,
			end: 0
		}),
		frameRate: 10,
		repeat: -1
	});

	/////////////////////
	///// Colliders /////
	/////////////////////

	this.physics.add.collider(alice, block);
	this.physics.add.collider(alice, ground);
	this.physics.add.collider(alice, lawn);
}

function update(): void {

}

new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: "bob-adventure",
		width: 800,
		height: 600,
		min: {
			width: 400,
			height: 300
		},
		max: {
			width: 1600,
			height: 1200
		}
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
});
