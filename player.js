define(["lib/compose", "health"], function(compose, Health){

    var Player = compose(function(){
        this.last = {
            attack: 0
        }
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
        this.falling = false
        this.apply_friction = true
        this.blocking = false
        this.attacking = false

        // convenience
        this.images = {
            left: document.getElementById("player_left"),
            right: document.getElementById("player_right"),
            attacking_right: document.getElementById("player_attacking_right"),
            attacking_left: document.getElementById("player_attacking_left")
        }
        this.game = undefined

        this.health_el = document.getElementById("health")
    },
    {
        id: "player",
        update: function(td, ts){
            var input = this.game.input,
                was_facing = this.facing


            function check_on_floor(object){
                 //  on floor logic
                if ( object.y + object.height >= 300 ){
                    object.y = 300 - object.height
                    object.y_vel = 0
                    object.falling = false
                } else {
                    object.falling = true
                }          
            }
              
            function jump(object, td){
                if ( !object.falling ) object.y_vel -= 500
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
           

            function handle_attack(object, input, ts){
                if ( ts > object.last.attack + 500 && input.attack ) {
                    object.attacking = true
                    object.last.attack = ts
                    
                } else if ( ts > object.last.attack + 100 ){
                    object.attacking = false
                }
            }

            check_on_floor(this)
            if ( input.jump ) jump(this, td)
            move_left_right(this, input, td)

            // attacking
            handle_attack(this, this.game.input, ts)

            // IMAGES
            if ( !this.attacking && !this.blocking ) this.image = this.images[this.facing]
            if ( this.attacking ) this.image = this.images["attacking_" + this.facing]

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
        
        
            // update health 
            this.health_el.innerHTML = this.health
        },

        damage: function(amount){
            this.health -= amount
            if ( this.health <= 0 ) this.game.remove(this)
        },

        check_collision: function(object){
            if ( object.collision_type == "enemy" && this.attacking ) object.damage(20, this)
        }
    })

    return Player

})
