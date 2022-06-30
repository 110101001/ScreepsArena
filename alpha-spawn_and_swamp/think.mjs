import {utils, constants, prototypes} from 'game';
import Creep from './creep.mjs';
var source_list;
var container_list;
var spawn_queue = [];
var stats = {};
var strategy = {
    expand: 1,
    defend: 0,
    offense: 0,
};

var think={
    init:function(){
        source_list = utils.getObjectsByPrototype(prototypes.Source);
        container_list = utils.getObjectsByPrototype(prototypes.Container);
    },
    run(){

    },
    update_container_list:function(){
        container_list = utils.getObjectsByPrototype(prototypes.Container);
    },

    determine_energy_destination:function(obj,amount){
        //find the cloest structure(except container) that has free capacity
        var struct_list = utils.getObjectsByPrototype(prototypes.Structure).filter(
            Structure=> Structure.store.getFreeCapacity(constants.RESOURCE_ENERGY)>amount 
            && Structure.structureType != STRUCTURE_CONTAINER);
        var struct = utils.findClosestObject(obj,struct_list);
        if(struct){
            return struct;
        }
        //find the cloest construction site 
        var construction = utils.findClosestObject(obj,utils.getObjectsByPrototype(prototypes.ConstructionSite));
        if(construction){
            return construction;
        }
        return null;
    },

    get_spawn_command: function(){
        //has expand/(expand + defend + offense) chance to spawn a worker
        var chance = Math.random();
        if(chance < strategy.expand/(strategy.expand + strategy.defend + strategy.offense)){
            //TODO: check if energy capacity is enough for heavy worker
            
            return "worker";
        }
        else if(chance < (strategy.expand + strategy.defend)/(strategy.expand + strategy.defend + strategy.offense)){
            return "melee";
        }
        else{
            //have 50%/50% chance to spawn a ranged creep or melee creep
            var chance = Math.random();
            if(chance < 0.5){
                return "ranged";
            }
            else{
                return "melee";
            }
        }
        return null;
    },

}

export default think;