import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import {utils, constants, prototypes} from 'game';

export function loop() {
    // Your code goes here
    //creeps = all my creeps
    var creeps = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    //flags = all my flags
    var flags = utils.getObjectsByPrototype(prototypes.Flag);
    for (var  creep of creeps) {
        //find the closest flag to creep by path
        var targetFlag = creep.findClosestByPath(flags);
        //move to the flag
        creep.moveTo(targetFlag);
    }
}
