import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import { getObjectsByPrototype } from 'game/utils';
import { Creep} from 'game/prototypes';
import {ATTACK, HEAL, RANGED_ATTACK, ERR_NOT_IN_RANGE} from 'game/constants';

export function loop() {
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var enemyCreeps = getObjectsByPrototype(Creep).find(creep => !creep.my);
    for (var creep of myCreeps) {
        if (creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
            
            if (creep.attack(enemyCreeps) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreeps);
            }
        }
        else if (creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
            if (creep.rangedAttack(enemyCreeps) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreeps);
            }
        }
        else if (creep.body.some(bodyPart => bodyPart.type == HEAL)) {
            //find a wounded creep
            var woundedCreep = myCreeps.find(creep => creep.hits < creep.hitsMax);
            if (creep.heal(woundedCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(woundedCreep);
            }
        }
    }
}
