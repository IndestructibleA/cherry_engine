var cherryjs = new cherryEngine('game_canvas');

cherryjs.create_scene('my_scene',function() {
  
  var rect = cherryjs.create_node(this, {    //Здесь создаем объекты, которые сразу привязываются к этой сцене
    type : 'rectangle',
    position : cherryjs.vector2(50, 50),
    size : cherryjs.vector2(100, 100),
    color : '#911e42' 
    
  });
  
  this.init = function() {  //Вызываем любой объект тут
   console.log('Движок инициализирован и готов к работе. Версия 0.0.1'); 
    
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

