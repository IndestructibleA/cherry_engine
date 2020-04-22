var cherryjs = new cherryEngine('game_canvas');

cherryjs.create_scene('my_scene',function(){
  
  var rect = cherryjs.create_node(this, {    //Здесь создаем объекты, которые сразу привязываются к этой сцене
    type : 'rectangle',
    position : cherryjs.vector2(50, 50),
    size : cherryjs.vector2(100, 100),
    color : '#bf22626' 
    
  });
  
  this.init = function(){  //Вызываем любой объект тут
    
    
  };
  
  this.update = function(dt){  // Обновление экрана.dt - delta time . Я знаю, 
                               // что ты забудешь про этот аргумент. Гугли.
    
  };
  
  this.draw = function(ctx){   // Отрисовка объекта (ctx) - это контекст, не забудь.
  
    
  };
  
  this.exit = function(){   // Событие при выходе из игры
  
     
  };
  
});