define(['lib/compose', 'throw_ninja'], function(compose, ThrowNinja){

    var LevelManager = compose({
        id: "level_manager",
        enemies_on_stage: [],
        waves: [],
        game: undefined,

        update: function(){
            var game = this.game
        
            // check if there are no enemies left
            if ( game.find_by_type("enemy").length == 0 ) {
                var ninja = new ThrowNinja
                ninja.x = 20
                var ninja2 = new ThrowNinja
                ninja2.x = 720
        
                game.add(ninja)
                game.add(ninja2)
            }
        }   
    
    })

    return LevelManager

})
