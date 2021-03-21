/**
 * Platform for the map
 */
export enum Platform {
	/**
	 * 	Alice. The main character of this game.
	 */
	Alice,
	/**
	 * Breakable block. The character may pass here if it's broken.
	 */
	Block,
	/**
	 * Recommended to put at the bottom, because... Ground...
	 */
	Ground,
	/**
	 * Recommended to put above the Ground. If Ground is not available, put this at the bottom instead.
	 */
	Lawn,
	/**
	 * There is nothing here but air. No image will be rendered if there is a space
	 */
	Space
}
