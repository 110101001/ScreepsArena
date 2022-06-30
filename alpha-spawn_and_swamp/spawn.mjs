import Creep from './creep.mjs';
import think from './think.mjs';
//import Miner
import Worker from './role.miner.mjs';
import { utils, constants, prototypes } from 'game';

var Spawner = {
    run: function (spawn) {
        //if it's not spawning, call think.get_spawn_command() to get the command
        if (spawn.spawning == null) {
            var role = think.get_spawn_command();
            if (role) {
                switch (role) {
                    case 'worker':
                        var creep = spawn.spawnCreep(Creep.CREEP_WORK).object;
                        if (creep) {
                            Worker.reset(creep);
                            //TODO: make a event system
                            //find the closest container and set it as target
                            var container = utils.getObjectsByPrototype(prototypes.StructureContainer).find(container => container.store.energy > 0);
                            
                            //if container is within 12 radius, set it as target
                            if (container && container.getRangeTo(spawn) <= 12) {
                                Worker.setTarget(creep, container);
                                console.log(container);
                            }
                        }
                        break;
                }
            }
        }
    }
}


export default Spawner;