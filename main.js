define(["lib/bean", 'lib/flywheel'], function(bean, flywheel){
    
    // init game

    var canvas = document.getElementById("main"),
        input = {
            jump: false,
            left: false,
            right: false,
            fire: false,
            block: false
        }

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
            input.fire = true
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
            input.fire = false
        else if ( k == 67)
            input.block = false

    })

    flywheel(function(){
        // main game loop
    }).start()

})
