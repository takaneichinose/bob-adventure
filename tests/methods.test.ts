import { EvtKey } from "../src/classes/enumerables";
import Methods from "../src/classes/methods";

test("Get 'left' event key", () => {
	expect(Methods.getAnimationName(EvtKey.Left));
});
