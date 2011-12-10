define(["lib/compose"], function(compose){

    var Player = compose(function(){
        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 100
        this.x_vel = 0
        this.y_vel = 0
        this.max_y_vel = 1000
        this.max_x_vel = 200

        this.friction = 70
        this.apply_friction = true

        this.on_floor = false

        this.health = 100

        this.game = undefined
    },
    {
        draw: function(context){
            context.fillRect(this.x, this.y, 100, 100)
        },
        update: function(){
            var input = this.game.input

            // gravity
            if ( this.y + this.height >= 300 ){
                this.y = 300 - this.height
                this.y_vel = 0
                this.on_floor = true
            } else {
                this.on_floor = false
            }             

            // jumping
            if ( input.jump  && this.on_floor ) this.y_vel -= 500

            // moving left to right
            this.apply_friction = false
            if ( input.left ) this.x_vel -= 50
            else if ( input.right ) this.x_vel += 50
            else this.apply_friction = true
        }
            
    })

    return Player

})
