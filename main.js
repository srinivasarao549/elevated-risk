define(["lib/bean", 'lib/flywheel', 'player', 'level_manager', 'game'], function(bean, flywheel, Player, LevelManager, Game){

    var sounds = {},
        sound_list = {
            sword: 'sound/sword.wav'
        }

    $("body").fadeIn(500)
    init_sm()
    
    // init sound manager
    function init_sm(){
        soundManager.url = 'soundmanager2.swf';
        soundManager.flashVersion = 9; // optional: shiny features (default = 8)
        soundManager.onready(function(){
            // load sounds
            Object.keys(sound_list).forEach(function(sound_name){
                sounds[sound_name] = soundManager.createSound(sound_name, sound_list[sound_name])
            })

            //
            init_title_screen()
        });
    }
    
    function init_title_screen(){
            $("#grey_layer").fadeOut(1500, 
                init
            );
            $("#main_notification").fadeOut(1500)
    }
    
    function init(){
         // init game
        var canvas = document.getElementById("main"),
            input = {
                jump: false,
                left: false,
                right: false,
                attack: false,
                block: false
            },
            game = new Game()



        // set up game
        game.canvas = canvas
        game.context = canvas.getContext('2d')
        game.input = input
        game.sounds = sounds

        // get controls
        bean.add(document, 'keydown', function(e){
            var k = e.which
            
            //e.preventDefault();

            if (  k == 37) 
                input.left = true
            else if ( k == 39) 
                input.right = true
            else if ( k == 38)
                input.jump = true
            else if ( k == 88)
                input.attack = true
            else if ( k == 67)
                input.block = true
        
            // disable up, down and space for scrolling
            if ( k == 38 || k == 40 || k == 32 ) e.preventDefault()
        })

        bean.add(document, 'keyup', function(e){
            var k = e.which
            
            if (  k == 37) 
                input.left = false
            else if ( k == 39) 
                input.right = false
            else if ( k == 38)
                input.jump = false
            else if ( k == 88)
                input.attack = false
            else if ( k == 67)
                input.block = false

        })

        // add player to game
        game.add(new Player())
        game.add(new LevelManager())

        flywheel(function(td, ts){
            game.draw_entities()
            game.move_entities(td)
            game.collide_entities()
            game.update_entities(td, ts)
        }).start()
     
    }
})
