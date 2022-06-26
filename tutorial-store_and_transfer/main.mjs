import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import { prototypes, utils, constants } from 'game';

export function loop() {
    // Your code goes here
    //creeps = all my creeps
    var creeps = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    //enemyCreeps = all enemy creeps
    var enemyCreeps = utils.getObjectsByPrototype(prototypes.Creep).find(creep => !creep.my);
    //towers = all my towers
    var towers = utils.getObjectsByPrototype(prototypes.StructureTower);
    //containers = all my containers
    var containers = utils.getObjectsByPrototype(prototypes.StructureContainer);

    //tower shoot any enemy creeps
    for (var tower of towers) {
        tower.attack(enemyCreeps);
    }
    
    for (var creep of creeps) {
        //if creeps is not carrying anything, withdraw from find a non-empty container
        if (creep.store.energy == 0) {
            var container = containers[0];
            if (container) {
                creep.withdraw(container, constants.RESOURCE_ENERGY);
            }
        }
        //if creeps is carrying anything, send it to a non-full tower
        else {
            var tower = towers.find(tower => tower.store.energy < constants.TOWER_CAPACITY);
            if (tower) {
                creep.transfer(tower, constants.RESOURCE_ENERGY);
            }
        }
    }
}
