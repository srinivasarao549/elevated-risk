define(["lib/compose"], function(compose){

    var Player = compose(function(){
        
        // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 70
        this.collision_type = "goodie"

        // state
        this.image = undefined
        this.x = 300
        this.y = 250
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
            right: document.getElementById("player_right"),
            attacking_right: document.getElementById("player_attacking_right"),
            attacking_left: document.getElementById("player_attacking_left"),
            blocking_right: document.getElementById("player_blocking_right"),
            blocking_left: document.getElementById("player_blocking_left")
        }
        this.game = undefined
    },
    {
        id: "player",
        update: function(td){
            var input = this.game.input,
                was_facing = this.facing


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
           

            check_on_floor(this)
            if ( input.jump ) jump(this, td)
            move_left_right(this, input, td)


            // attacking and blocking
            if ( input.block ) this.blocking = true
            else this.blocking = false

            if ( input.attack ) this.attacking = true
            else this.attacking = false

            // IMAGES
            if ( !this.attacking && !this.blocking ) this.image = this.images[this.facing]
            if ( this.attacking ) this.image = this.images["attacking_" + this.facing]
            if ( this.blocking ) this.image = this.images["blocking_" + this.facing]
            

            // correct for animation and turning
            if ( was_facing != this.facing ){
                if ( this.facing == "right" ) this.x += 30
                if ( this.facing == "left") this.x -= 30
                }

            if ( this.facing == "left"){
                this.x += this.width - this.image.width
                this.width = this.image.width
            } else if ( this.facing == "right" ) {
                this.width = this.image.width
            }

            this.y += this.height - this.image.height
            this.height = this.image.height
        
        }
            
    })

    return Player

})
