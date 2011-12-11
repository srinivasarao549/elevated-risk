define(["lib/compose", "lib/om"], function(compose, om){
 
    var game = compose(om, {
        canvas: undefined,
        context: undefined,
        gravity: 1500,
        collision_objects: {},

        // object management
        add: function(object){
            om.prototype.add.apply(this, arguments)
            object.game = this
            
            if ( object.collision_type ) {
                if ( !this.collision_objects[object.collision_type] ) 
                    this.collision_objects[object.collision_type] = []
                this.collision_objects[object.collision_type].push(object)
            }

        },

        // object stages
        draw_entities: function(){
            var canvas = this.canvas,
                context = this.context
           
            function draw(object){
                if ( object.draw ) object.draw(context)
                if ( object.image ) context.drawImage(object.image, object.x, object.y)
            }
 
            // clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height)

            // draw entities
            this.objects.forEach(draw)

        },
        move_entities: function(td){
            var gravity = this.gravity,
                td = td/1000    // convert to px per second

            function move(object){
                 // update gravity
                if ( object.falling ) object.y_vel += gravity * td

                // update friction
                if ( object.apply_friction ) object.x_vel = object.x_vel / (object.friction * td)

                // limit velocities
                if ( object.y_vel > object.max_y_vel ) object.y_vel = object.max_y_vel
                if ( object.x_vel > object.max_x_vel ) object.x_vel = object.max_x_vel

                if ( object.y_vel < -object.max_y_vel ) object.y_vel = -object.max_y_vel
                if ( object.x_vel < -object.max_x_vel ) object.x_vel = -object.max_x_vel

                // move
                object.x += object.x_vel * td
                object.y += object.y_vel * td
                              
            }

            this.objects.forEach(move)
        
        },
        update_entities: function(td){
            var td = td / 1000 // convert to seconds

            function update(object){
                if ( object.update ) object.update(td)
            }
            
            this.objects.forEach(update)
        },
        collide_entities: function(){
        
        
        },
    })


    return game
    
})
