define(["lib/compose", "lib/om"], function(compose, om){
 
    var game = compose(om, {
        draw_entities: function(){},
        move_entities: function(){},
        collide_entities: function(){}
    })



    return game
    
})
