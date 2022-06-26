import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import {utils, constants, prototypes} from 'game';
import { MOVE } from 'game/constants';

export function loop() {
    // Your code goes here
    //spawns = all my spawns
    var spawns = utils.getObjectsByPrototype(prototypes.StructureSpawn);
    //flag = all my flags
    var flags = utils.getObjectsByPrototype(prototypes.Flag);
    //every flag should be assigned with a creep, and the information is stored in the flag.memory.creep
    //if creep is undefined, spawn a new creep with [MOVE, ATTACK]
    for(var flag of flags) {
        if(!flag.memory) {
            flag.memory={};
        }
        //if creep is undefined and spawn is not spawning, spawn a new creep with [MOVE, ATTACK]
        if(!flag.memory.creep && spawns[0].spawning == null) {
            console.log('Spawning new creep');
            var creep = spawns[0].spawnCreep([MOVE]).object;
            flag.memory.creep = creep;
            break;
        }
    }
    for(var flag of flags) {
        //if creep is defined, move the creep to the flag
        if(flag.memory.creep) {
            var creep = flag.memory.creep;
            creep.moveTo(flag);
        }
    }
}
