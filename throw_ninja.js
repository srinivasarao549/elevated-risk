define(["lib/compose", "throwing_star"], function(compose, ThrowingStar){

    var ThrowNinja = compose(function(){
        
        // last time an action was taken, for 'cooldowns'
        this.last = {
            attack: 0,
            invunerable: 0
        }
        
        // constraints
        this.max_y_vel = 1000
        this.max_x_vel = 300
        this.friction = 70
        this.collision_type = "enemy"
        this.type = "enemy"

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
        this.invunerable = false
        this.make_invunerable = false

        this.falling = false
        this.apply_friction = true
        this.blocking = false
        this.attacking = false

        // convenience
        this.images = {
            left: document.getElementById("throw_ninja_left"),
            right: document.getElementById("throw_ninja_right")
        }
        this.game = undefined
    },
    {
        update: function(td, ts){
            var was_facing = this.facing,
                player = this.game.find_by_id("player")


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


            function check_in_room(object){
                if ( object.x + object.width >= 800 ) {
                    object.x = 800 - object.width
                    object.x_vel = 0
                } else if ( object.x <= 0 ){
                    object.x = 0
                    object.x_vel = 0
                }
            }

            function move(object, input, td){
                // moving left to right and friction logic
                object.apply_friction = false
                if ( input.left ){
                    object.x_vel -= (1000 * td)
                    object.facing = "right"
                }            
                else if ( input.right ) {
                    object.x_vel += (1000 * td)
                    object.facing = "left"
                } 
                else object.apply_friction = true
            }
 
            function correct_height(object){
                object.y += object.height - object.image.height
                object.height = object.image.height
            }
            
            // try to jump over and run
            function if_close(object, player, game){
                attack(object, player, game)
                
                if ( object.x < 400 ) move(object, {left: false, right: true}, td)
                else move(object, {left: true, right: false}, td)
                jump(object, td)
            }


            // try to attack
            function if_far(object, player, game){
                attack(object, player, game)
                // run away
                if ( player.x < this.x ) move(this, {left: false, right: true}, td )
                else move(this, {left: true, right: false}, td )

            }

            function attack(object, player, game){

                if ( ts > object.last.attack + 1000 ){
                    var star = new ThrowingStar

                    if( object.x < player.x ){
                        star.x_vel = 500
                    } else {
                        star.x_vel = -500
                    }
                    star.x = object.x + object.width/2
                    star.y = object.y + object.height/2

                    object.last.attack = ts
                    game.add(star)    
                } 
            }

            function check_close(object, player, game){
                if ( Math.abs(object.x - player.x) < 200 ) 
                    if_close(object, player, game)
                else 
                    if_far(object, player, game)
            }

            function handle_invunerability(object){
                if ( object.make_invunerable ) {
                    object.make_invunerable = false
                    object.invunerable = true
                    object.last.invunerable = ts
                } else if ( ts > object.last.invunerable + 1000 ) {
                    object.invunerable = false
                }
            }

            if ( this.facing == "left" ) this.image = this.images.left
            else this.image = this.images.right
            
            // ai stuff
            check_on_floor(this)
            check_in_room(this)
            check_close(this, player, this.game)
            correct_height(this)
            
            // invunerability
            handle_invunerability(this)
        },

        damage: function(amount, object){
            
            if ( object.x_vel ) {
                if ( object.x_vel > 0) this.x_vel += 1000
                if ( object.x_vel < 0) this.x_vel -= 1000
            }

            if ( !this.invunerable ){
                 this.health -= amount
                 this.make_invunerable = true
            }

            if ( this.health <= 0 ) this.game.remove(this)
        }
        
        })

    return ThrowNinja

})
