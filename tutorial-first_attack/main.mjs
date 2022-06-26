import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import {getObjectsByPrototype} from 'game/utils';
import {Creep} from 'game/prototypes';
import { ERR_NOT_IN_RANGE } from 'game/constants';

export function loop() {
    // Your code goes here
    var myCreeps = getObjectsByPrototype(Creep).find(creep => creep.my);
    var enemyCreeps = getObjectsByPrototype(Creep).find(creep => !creep.my);
    if(myCreeps.attack(enemyCreeps) == ERR_NOT_IN_RANGE) {
        myCreeps.moveTo(enemyCreeps);
    }
}
