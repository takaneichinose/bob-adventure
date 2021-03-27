/////////////////////////////////////
////////// LIBRARY IMPORTS //////////
/////////////////////////////////////

import * as Phaser from "phaser";

///////////////////////////////////
////////// CLASS IMPORTS //////////
///////////////////////////////////

import * as Const from "./classes/constants";
import Methods from "./classes/methods";

////////////////////////////////////
////////// ASSETS IMPORTS //////////
////////////////////////////////////

// Characters
import sprAlice from "./images/bob-adventure-alice-sprite.png";

// Collisions and Obstacles
import imgBackground from "./images/bob-adventure-img-background.png";
import imgBlock from "./images/bob-adventure-img-block.png";
import imgGround from "./images/bob-adventure-img-ground.png";
import imgLawn from "./images/bob-adventure-img-lawn.png";

class BobAdventureScene extends Phaser.Scene {
	/**
	 * Bob Adventure game constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Preload the assets to be used in the game
	 */
	preload(): void {
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

	/**
	 * Create, and initialize the game canvas
	 */
	create(): void {
		// Add background data to the canvas
		Methods.addBackground(this);
	
		// Define all the needed platforms for the game
		Methods.definePlatforms(this);
	
		// Create the map for the game
		Methods.createMap();
		
		// Check if the position of Alice is set
		Methods.checkAlicePos();
	
		// Define the character's settings
		Methods.defineAlice(this);
		
		// Define the character's animation settings
		Methods.defineAliceAnimations(this);
	
		// Add the colliders for the character and platforms
		Methods.addColliders(this);
	}

	/**
	 * Update the data inside the canvas
	 */
	update(): void {
		// Define the character's control settings
		Methods.defineAliceControls(this);
	}
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
	scene: [BobAdventureScene]
});
