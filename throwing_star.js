define(['lib/compose'], function(compose){
    
    var ThrowingStar = compose({
        x: 0,
        y: 0,
        height: 10,
        width: 10,
        x_vel: 100,
        y_vel: 0,
        collision_type: "weapon",
        falling: false,
        images: {
            left: document.getElementById("throwing_star_left"),
            right: document.getElementById("throwing_star_right")
        },
        image: undefined,
        
        update: function(){

            if ( this.x_vel < 0 ) this.image = this.images.left
            else this.image = this.images.right

            function check_in_room(object, game){
                if ( object.x > 1000 ) game.remove(object)
                else if ( object.x < -200) game.remove(object)
            }

            check_in_room(this, this.game)
        },
        
        check_collision: function(object){
            if ( object.id == "player" ) {
                if ( !object.attacking ) object.damage(20);
                this.game.remove(this)
            }
        }
    })

    return ThrowingStar
})
