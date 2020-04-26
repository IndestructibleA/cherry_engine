var cherryjs = new Cherry('my_game', {
  
  back : {
    'auto_clear' : false
  },
  
  main :{
    'auto_clear' : true
  }
  
});



cherryjs.create_scene('my_scene',function() {
  
  var rect = cherryjs.create_node(this, {    //Здесь создаем объекты, которые сразу привязываются к этой сцене
    type : 'rectangle',
    position : cherryjs.vector2(50, 50),
    size : cherryjs.vector2(100, 100),
    color : '#911e42',
    layer : 'main'
  //huo
  });
  
  this.init = function() {  //Вызываем любой объект тут
    console.log('inited');
    cherryjs.get_layer('back').draw_rect({
      x : 10, y : 10,
      width : 500, height : 200,
      color : '#696969'
    });
    
    cherryjs.select_layer('main');
    
  };
  
  this.update = function(dt) {  // Обновление экрана.dt - delta time . Я знаю, 
                               // что ты забудешь про этот аргумент. Гугли.
    rect.move(cherryjs.vector2(1, 0));
  
    
  };
  
  this.draw = function(ctx) {   // Отрисовка объекта (ctx) - это контекст, не забудь.
  
    
  };
  
  this.exit = function() {   // Событие при выходе из игры
  
     
  };
  
});

cherryjs.start('my_scene'); // теперь движок знает, что он запущен

