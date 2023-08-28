import { init, update } from "automaton-controller";
import { FPS } from "constants";

init();
setInterval(update, 1000 / FPS);

