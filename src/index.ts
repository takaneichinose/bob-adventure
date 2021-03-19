/////////////////////////////////////
////////// LIBRARY IMPORTS //////////
/////////////////////////////////////

import * as Phaser from "phaser";

///////////////////////////////////
////////// CLASS IMPORTS //////////
///////////////////////////////////

import { Platform } from "./classes/interfaces";
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

let alice: any;

let ground: any;
let block: any;
let lawn: any;

// Preload the assets to be used at the game
function preload(): void {
	this.load.image("background", imgBackground);
	this.load.image("block", imgBlock);
	this.load.image("ground", imgGround);
	this.load.image("lawn", imgLawn);

	// Load the spritesheet of Bob
	this.load.spritesheet("alice", sprAlice, {
		frameWidth: 22,
		frameHeight: 32
	});
}

// Create, and place the assets into the canvas
function create(): void {
	// The name must be the same as the one in the preload function
	this.add.image(400, 300, "background");

	// Main character

	// Obstacles

	block = this.physics.add.staticGroup();
	ground = this.physics.add.staticGroup();
	lawn = this.physics.add.staticGroup();

	for (let i: number = 0; i < Map.length; i++) {
		const row: Array<Platform> = Map[i];

		for (let j: number = 0; j < row.length; j++) {
			const col: Platform = row[j];
			const x: number = (CELL_SIZE / 2) + (j * CELL_SIZE);
			const y: number = (CELL_SIZE / 2) + (i * CELL_SIZE);

			switch (col) {
				case Platform.Block:
					block.create(x, y, "block");
					break;
				case Platform.Ground:
					ground.create(x, y, "ground");
					break;
				case Platform.Lawn:
					lawn.create(x, y, "lawn");
					break;
			}
		}
	}
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
