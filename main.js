define(["lib/bean", 'lib/flywheel', 'Player', 'Game'], function(bean, flywheel, Player, Game){
    
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

    // get controls
    bean.add(document, 'keydown', function(e){
        var k = e.which
        
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


    flywheel(function(td){
        game.draw_entities()
        game.move_entities(td)
        game.update_entities(td)
    }).start()

})
