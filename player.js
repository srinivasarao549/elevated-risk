define(["lib/compose"], function(compose){

    var Player = compose(function(){
        
        // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 100

        // state
        this.image = document.getElementById("player_left")
        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 125
        this.x_vel = 0
        this.y_vel = 0
        
        this.health = 100
        this.on_floor = false
        this.apply_friction = true
        this.blocking = false
        this.attacking = false

        // convenience
        this.game = undefined
    },
    {
               update: function(td){
            var input = this.game.input

            // gravity and on floor logic
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
            if ( input.left ) this.x_vel -= (1000 * td)
            else if ( input.right ) this.x_vel += (1000 * td)
            else this.apply_friction = true

            // attacking and blocking
            if ( input.block ) this.blocking = true
            if ( input.attack ) this.attacking = true
        }
            
    })

    return Player

})
