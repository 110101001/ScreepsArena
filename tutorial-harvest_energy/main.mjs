import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import {utils, constants, prototypes} from 'game';

export function loop() {
    // Your code goes here
    //workers = all my creeps with WORK body part
    var workers = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    var source = utils.getObjectsByPrototype(prototypes.Source);
    var spawn = utils.getObjectsByPrototype(prototypes.StructureSpawn);
    //if worker'S ENERGY HAS NOT REACHED CAPICITY, move and harvest the source
    for(var worker of workers) {
        if(worker.store.energy < worker.store.getCapacity()) {
            if(worker.harvest(source[0]) == constants.ERR_NOT_IN_RANGE) {
                worker.moveTo(source[0]);
            }
        }
        //if worker's energy is full, move and send energy to spawn
        else if(worker.store.energy == worker.store.getCapacity()) {
            if(worker.transfer(worker.findClosestByPath(spawn), constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                worker.moveTo(worker.findClosestByPath(spawn));
            }
        }
    }
}
