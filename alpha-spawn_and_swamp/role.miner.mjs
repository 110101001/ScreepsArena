import { } from './creep.mjs';
import { } from './think.mjs';
import { utils, constants, prototypes } from 'game';

const STATE_IDLE = 0;
const STATE_HARVEST = 1;
const STATE_TRANSFER = 2;
const STATE_ESCAPE = 3;

var Worker = {
    reset: function (creep) {
        creep.role = "worker";
        creep.state = STATE_HARVEST;
        creep.target = null;
        creep.destination = null;
    },
    setTarget: function (creep, target) {
        creep.target = target;
    },
    run: function (creep) {
        switch (creep.state) {
            case STATE_IDLE:
                break;
            case STATE_HARVEST:
                //if creep store is full or target is empty, switch to build or transfer state
                if (creep.store.getFreeCapacity() == 0 ||
                    creep.target.store.energy == 0) {
                    var destination = think.determine_energy_destination(creep, creep.store.getUsedCapacity());
                    if (destination) {
                        creep.state = STATE_TRANSFER;
                    }
                }
                else {
                    //if target is source, go and harvest the target
                    var ret;
                    if (creep.target.structureType == constants.STRUCTURE_SOURCE) {
                        ret = creep.harvest(creep.target);
                    }
                    else {
                        ret = creep.withdraw(creep.target, constants.RESOURCE_ENERGY);
                    }
                    console.log(ret);
                    switch (ret) {
                        case constants.ERR_NOT_IN_RANGE:
                            creep.moveTo(creep.target);
                            break;
                    }
                }
                break;
            case STATE_BUILD:

                break;
            case STATE_TRANSFER:
                //if creep store is empty or destination is full, switch to withdraw or harvest state
                //TODO: check if it's a construction site
                if (creep.store.energy == 0 ||
                    creep.destination.store.getFreeCapacity() == 0) {
                    creep.state = STATE_HARVEST;
                }
                else {
                    //trabsfer energy to destination
                    var ret = creep.transfer(creep.destination, constants.RESOURCE_ENERGY);
                    switch (ret) {
                        case constants.ERR_NOT_IN_RANGE:
                            creep.moveTo(creep.destination);
                            break;
                    }
                }
                break;

        }
    }
}

export default Worker;