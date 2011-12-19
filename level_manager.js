define(['lib/compose', 'health', 'throw_ninja'], function(compose, Health, ThrowNinja){

    var LevelManager = compose({
        id: "level_manager",
        enemies_on_stage: [],
        waves: [
                {number: 1, throw_rate: 1000, health: 20, speed: 300},
                {number: 1, throw_rate: 1000, health: 20, speed: 300},
                {number: 1, throw_rate: 1000, health: 20, speed: 300},
                {number: 1, throw_rate: 1000, health: 20, speed: 300},
                
                {number: 2, throw_rate: 1500, health: 20, speed: 300},
                {number: 2, throw_rate: 1500, health: 20, speed: 300},
                {number: 2, throw_rate: 1500, health: 20, speed: 300},
                {number: 2, throw_rate: 1500, health: 20, speed: 300},
                
                {number: 3, throw_rate: 2000, health: 20, speed: 300},
                {number: 3, throw_rate: 2000, health: 20, speed: 300},
                {number: 3, throw_rate: 2000, health: 20, speed: 300},
                {number: 3, throw_rate: 2000, health: 20, speed: 300},

                {number: 4, throw_rate: 2000, health: 20, speed: 300},
                {number: 4, throw_rate: 2000, health: 20, speed: 300},
                {number: 4, throw_rate: 2000, health: 20, speed: 300},
                {number: 4, throw_rate: 2000, health: 20, speed: 300},

                {number: 5, throw_rate: 2000, health: 20, speed: 300},
                {number: 5, throw_rate: 2000, health: 20, speed: 300},
                {number: 5, throw_rate: 2000, health: 20, speed: 300},
                {number: 5, throw_rate: 2000, health: 20, speed: 300},
            ],
        current_wave: 0,
        game: undefined,

        update: function(){
            var game = this.game,
                self = this
        
            function make_wave(){
                var wave = self.waves[self.current_wave],
                    player = game.find_by_id("player")

                if ( !wave ) return won()
                
                for ( var i = 0; i < wave.number; i += 1){
                    var ninja = new ThrowNinja
                    ninja.health = wave.health
                    ninja.throw_rate = wave.throw_rate

                    console.log(ninja.throw_rate)
                    ninja.max_x_vel = wave.speed

                    if ( Math.random() > 0.5 )
                        ninja.x = player.x + 800 - (Math.random() * 100)
                    else 
                        ninja.x = player.x - 800 + (Math.random() * 100)

                    game.add(ninja)
                }

                if ( Math.random() > 0.6 ) {
                    var health = new Health
                    if ( Math.random() > 0.5 )
                        health.x = player.x + 800 - (Math.random() * 100)
                    else 
                        health.x = player.x - 800 + (Math.random() * 100)
                    game.add(health)
                }

                self.current_wave += 1
            }

            function check_state(){
                if ( game.find_by_type("enemy").length == 0 ) 
                    make_wave()
            }

            function won(){
                
                $("#won").fadeIn(1000)
            
            }
        
            check_state()
        }   
    
    })

    return LevelManager

})
