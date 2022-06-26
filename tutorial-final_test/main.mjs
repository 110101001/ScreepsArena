import { } from 'game/utils';
import { } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';
import { utils, constants, prototypes } from 'game';
import { MOVE,WORK,CARRY, ATTACK} from 'game/constants';

class Miner{
    constructor(creep){
        this.creep = creep;
    }
    run(){
        var creep = this.creep;
        var source = utils.getObjectsByPrototype(prototypes.Source)[0];
        if(creep.store.energy < creep.store.getCapacity()){
            if(creep.harvest(source) == constants.ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
        else{
            var spawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
            if(creep.transfer(spawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE){
                creep.moveTo(spawn);
            }
        }
    }
}

class Fighter{
    constructor(creep){
        this.creep = creep;
    }
    run(){
        var creep = this.creep;
        var enemy = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my == false);
        var target = creep.findClosestByPath(enemy);
        if(target){
            if(creep.attack(target) == constants.ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    }
}

var inited;
var spawnCircularQueue;

export function loop() {
    // Your code goes here
    if(!inited){
        inited=1;
        spawnCircularQueue = ['miner','fighter','fighter'];
    }
    var units = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    var spawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
    //if spawn is not spawning, spawn the first unit in the queue and move it to rear of the queue
    if(spawn.spawning == null){
        //get first unit in the queue
        var unit = spawnCircularQueue[0];
        if(unit == 'miner'){
            var creep = spawn.spawnCreep([WORK,CARRY,MOVE,MOVE]).object;
            if(creep){
                creep.role = 'miner';
                
                spawnCircularQueue.shift();
                spawnCircularQueue.push(unit);
            }
        }
        else if(unit == 'fighter'){
            var creep = spawn.spawnCreep([ATTACK,ATTACK,MOVE,MOVE]).object;
            if(creep){
                creep.role = 'fighter';

                spawnCircularQueue.shift();
                spawnCircularQueue.push(unit);
            }
        }
    }
    for(var unit of units){
        if(unit.role == 'miner'){
            new Miner(unit).run();
        }
        else if(unit.role == 'fighter'){
            new Fighter(unit).run();
        }
    }
}
