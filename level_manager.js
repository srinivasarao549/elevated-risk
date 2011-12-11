define(['lib/compose', 'throw_ninja'], function(compose, ThrowNinja){

    var LevelManager = compose({
        id: "level_manager",
        enemies_on_stage: [],
        waves: [],
        game: undefined,

        update: function(){

            function add_enemy(game, object, array){
                game.add(object)
                array.push(object)
            }

            if ( this.enemies_on_stage.length == 0 ) {
                var ninja = new ThrowNinja
                ninja.x = 20
                add_enemy(this.game, ninja, this.enemies_on_stage)
            }
        }   
    
    })

    return LevelManager

})
