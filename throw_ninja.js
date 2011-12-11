define(["lib/compose"], function(compose){

    var ThrowNinja = compose(function(){
        
        // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 70

        // state
        this.image = undefined
        this.x = 300
        this.y = 100
        this.width = 80
        this.height = 100
        this.x_vel = 0
        this.y_vel = 0
        
        this.facing = "left"

        this.health = 100
        this.on_floor = false
        this.apply_friction = true
        this.blocking = false
        this.attacking = false

        // convenience
        this.images = {
            left: document.getElementById("player_left"),
            right: document.getElementById("throw_ninja_right"),
            attacking_right: document.getElementById("throw_ninja_right"),
            attacking_left: document.getElementById("throw_ninja_attacking_left"),
            blocking_right: document.getElementById("throw_ninja_blocking_right"),
            blocking_left: document.getElementById("throw_ninja_blocking_left")
        }
        this.game = undefined
    },
    {
        update: function(td){
            var was_facing = this.facing

            function check_on_floor(object){
                 //  on floor logic
                if ( object.y + object.height >= 300 ){
                    object.y = 300 - object.height
                    object.y_vel = 0
                    object.on_floor = true
                } else {
                    object.on_floor = false
                }          
            }
              
            function jump(object, td){
                if ( object.on_floor ) object.y_vel -= 500
                else object.y_vel -= (600 * td)

            }

            function move_left_right(object, input, td){
                // moving left to right and friction logic
                object.apply_friction = false
                if ( input.left ){
                    object.x_vel -= (1000 * td)
                    object.facing = "left"
                }            
                else if ( input.right ) {
                    object.x_vel += (1000 * td)
                    object.facing = "right"
                } 
                else object.apply_friction = true
            }
 
            function correct_height(){
                object.y += object.height - object.image.height
                object.height = object.image.height
            }
            
            check_on_floor(this)
            jump(this, td)

            this.image = this.images.left;
        
        }
            
    })

    return ThrowNinja

})
