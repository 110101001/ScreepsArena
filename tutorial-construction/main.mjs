import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import { utils, constants, prototypes } from 'game';

var towerConstructionSite;

export function loop() {
    // Your code goes here
    //workers = all my creeps 
    var workers = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    var containers = utils.getObjectsByPrototype(prototypes.StructureContainer);
    //build a tower construction site if there is none
    if (!towerConstructionSite) {
        utils.createConstructionSite({ x: 50, y: 55 }, prototypes.StructureTower);
        towerConstructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite)[0];
        for (var worker of workers) {
            worker.memory = {};
            worker.memory.state = 0;
        }
    }
    //if worker'S ENERGY HAS NOT REACHED CAPICITY, move and harvest the source
    for (var worker of workers) {
        switch (worker.memory.state) {
            case 0:
                if (worker.store.energy < worker.store.getCapacity()) {
                    if (worker.withdraw(containers[0], constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        worker.moveTo(containers[0]);
                    }
                }
                else {
                    worker.memory.state = 1;
                }
            case 1:
                if (worker.store.energy > 0) {
                    console.log(worker.build(towerConstructionSite));
                    if (worker.build(towerConstructionSite) == constants.ERR_NOT_IN_RANGE) {
                        worker.moveTo(towerConstructionSite);
                    }
                }
                else {
                    worker.memory.state = 0;
                }
        }
    }
}
