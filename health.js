define(function(){


    function Health(){
        
    // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 70
 
    // state
        this.image = document.getElementById("health_pickup")
        this.width = 40
        this.height = 40
        
        this.x = 300
        this.y = 300 - this.width
        this.x_vel = 0
        this.y_vel = 0
        
        this.falling = false
        this.apply_friction = true
    }

    Health.prototype = {
        
        update: function(){
            if ( this.x < 0 ) this.x = 0
            if ( this.x > this.game.canvas.width - this.width )
                this.x = this.game.canvas.width - this.width

            console.log(this.x, this.y, this.image)
        },
        check_collision: function(object){
            if ( object.collision_type !== "goodie" ) return
            object.heal(20)
            this.game.sounds.health.play()
            this.game.remove(this)
        }
    }

    return Health
    
})
