define(function(){ 

   // main controlling object
    var ObjectManager = function(){
        this.objects = []
        this.objects_modified = false
    }
    
    ObjectManager.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            remove: remove,
            remove_all: remove_all,
            find_instances: find_instances,
            find_nearest: find_nearest,
            find_by_id: find_by_id,
            
        }
        
        
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        function add(object){
            // store
            this.objects.push(object)
            this.objects_modified = true
            return object
        }        
                
        function remove(object){
            var index = this.objects.indexOf(object)
            if ( index >= 0 ){
                this.objects.splice(index, 1)      
                this.objects_modified = true                      
            }
        }
        
        function remove_all(){
            this.objects = []
        }
        
        function find_instances(ctor, obj_set){
            var objs = obj_set || this.objects,
                return_objs = []
            
            objs.forEach(function(o){
                if ( o.constructor == ctor ) 
                    return_objs.push(o)
            })
            return return_objs
        }
        
        function find_nearest(reference_object, obj_set){
            var objs = obj_set || this.objects,
                nearest_obj, nearest_distance
            
            objs.forEach(function(o){
                var diffx = Math.abs(reference_object.x - o.x),
                    diffy = Math.abs(reference_object.y - o.y),
                    distance = diffy*diffy + diffx*diffx
                    
                if ( nearest_distance === undefined ){    
                    nearest_distance = distance
                    nearest_obj = o
                } else if ( nearest_distance > distance ){
                    nearest_distance = distance
                    nearest_obj = o
                }
            })

            return nearest_obj
        }

        function find_by_id(id, obj_set){
            var objs = obj_set || this.objects,
                obj = null
                
            objs.forEach(function(o){
                if ( o.id == id ) obj = o
            })
            return obj
        }
        
        
    })()


    return ObjectManager
}) 
