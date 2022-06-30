import {utils,prototypes} from 'game';
import { } from 'arena';
//import everything
import { } from './creep.mjs';
import { } from './source.mjs';
import Spawner from './spawn.mjs';
import Worker from './role.miner.mjs';
import { } from './think.mjs';
export function loop() {
    //run all my spawns
    for(var spawn of utils.getObjectsByPrototype(prototypes.StructureSpawn).filter(spawn => spawn.my == true)){
        Spawner.run(spawn);
    }
    
    for(var cp of utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my == true)){
        //run all my creeps
        switch(cp.role){
            case 'worker':
                Worker.run(cp);
                break;
        }
    }
}
