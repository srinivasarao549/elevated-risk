define(["lib/compose"], function(compose){

    var Player = compose(function(){
        
        // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 70

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
        update: function(td){
            var input = this.game.input,
                was_facing = this.facing

            //  on floor logic
            if ( this.y + this.height >= 300 ){
                this.y = 300 - this.height
                this.y_vel = 0
                this.on_floor = true
            } else {
                this.on_floor = false
            }             

            // jumping
            if ( input.jump  && this.on_floor ) this.y_vel -= 500
            else if ( input.jump ) this.y_vel -= (600 * td)     // megaman style - control jump height

            // moving left to right and friction logic
            this.apply_friction = false
            if ( input.left ){
                 this.x_vel -= (1000 * td)
                this.facing = "left"
            }            
            else if ( input.right ) {
                this.x_vel += (1000 * td)
                this.facing = "right"
            } 
            else this.apply_friction = true

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
                if ( this.facing == "left") this.x -= 10
            }

            if ( this.facing == "left"){
                this.x += this.width - this.image.width
                this.width = this.image.width
            } else if ( this.facing == "right" ) {
                this.x -= this.width - this.image.width
                this.width = this.image.width
            }

            this.y += this.height - this.image.height
            this.height = this.image.height
        
        }
            
    })

    return Player

})
