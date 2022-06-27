var Source_controller = {
    reset : function(source){
        source.memory.pending_energy = 0;
    },
    pend: function(source,amount){
        source.memory.pending_energy += amount;
    }
}

export default Source_controller;