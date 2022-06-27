import {utils, constants, prototypes} from 'game';
var source_list;
var container_list;

var think={
    init:function(){
        source_list = utils.getObjectsByPrototype(prototypes.Source);
        container_list = utils.getObjectsByPrototype(prototypes.Container);
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
    }
}

export default think;