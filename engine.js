 /* 
                                                                              
                                                     __.--~~.,-.__
 _____ _                      _____         _          `~-._.-(`-.__`-.
|     | |_ ___ ___ ___ _ _   |   __|___ ___|_|___ ___          \    `~~`
|   --|   | -_|  _|  _| | |  |   __|   | . | |   | -_|    .--./ \
|_____|_|_|___|_| |_| |_  |  |_____|_|_|_  |_|_|_|___|   /#   \  \.--.
                      |___|            |___|             \    /  /#   \
                                                          '--'   \    /
                                                                  '--'              
                                                                             */

//     Cherry Engine version 0.0.1
// A basic engine for web games writing in html, and javascript technology .
// этот движок работает с тегом Canvas. Достоинства - максимальная производительность.
// Движок создан при поддержке Alcoshopers Lab
// Автор: IndestructibleA   GitHub: https://github.com/IndestructibleA 

var cherryEngine = function(_canvas){
   'use strict';
  var cherryEngine = this; //ссылка на себя
        
        // Глобальные переменные //
  var canvas = null
        ,size = null
        ,canvas_offset = null
        ,running = false
        ,active_scene = null
        ,context = null; //расположение канваса
        
        // Инициализация движка через _INIT //
  var _INIT = function(){  
    if (typeof _canvas !== 'object') canvas = document.getElementById(_canvas);
    else canvas = _canvas;
    context = canvas.getContext('2d');
    size = vector2(canvas.width , canvas.height);
    
    var pos = canvas.getBoundingClientRect();
    canvas_offset = vector2(pos.left, pos.right);
    //context.fillText('Canvas инициализирован. Жду дальнейших инструкций', 30, 20); 
    
   // console.log(size.y);
  };
  
  // MATH - Матеша //
  var int = function (num) { // проверка на число
    return isNumber(num) ? num : 0;
  }
  
  
  
  
  
  
  
  
  // VECTORS Вектора //
  class Vector2 {
    constructor (x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
    plus (par) {
      this.x += par.x;
      this.y += par.y;
    }
  }
  
  
  
  
  var vector2 = this.vector2 = function(x, y){
    return new Vector2(x, y);
  };
  
  // ENGINE - Движок //
  
  var _update = function() {
  
  active_scene.update();
  active_scene.draw_nodes();
  active_scene.draw();
    
  if (running) requestAnimationFrame(_update); //Цикл
  };
  
  this.start = function (name) {
   if (running) return;
   running = cherryEngine.set_scene(name);
   if (running) {
     _update();
   }
  };

  // SCENES - Сцены. //
  var scenes = {};
  
  class Scene { //вспомогательный класс
    constructor (scn) {
     this.scene = scn; 
    }
    
    init () {
      this.scene.init()
    }
    update () {
      this.scene.update()
    }
    draw () {
      this.scene.draw()
    }
    exit () {
      this.scene.exit()
    }
   
    draw_nodes () {
      var i = 0, len = this.scene.nodes.length;
      for (;i < len; i++) {
        if (typeof this.scene.nodes[i].draw !== 'undefined') {
        this.scene.nodes[i].draw();
          
        }
      }
    }
  
  }
  
  this.create_scene = function (name, Construct){
    scenes[name] = new Scene (new Construct());//новый конструкт сцены. Короче сюда будут отправляться характеристики чокаве
    
  };
  
  this.set_scene = function (name) {
    if (!name || !scenes[name]) return false;
    
    if (active_scene) {
     active_scene.exit();
    } 
    
    active_scene = scenes[name];
    active_scene.init();
    return true;
  };
  
  
  // NODES - Ноды. Они же игровые объекты. //
  class Node {          //Базовый класс
   constructor (par) {
     this.position = par.position;
     this.size = par.size;
     this.type = 'Node';
     
     
   } 
    
    move (par) { //Перемещение
      
      this.position.plus(par);
    }
    
  }
  
  class NodeRect extends Node { //наследует класс Node
    constructor(par){
    super(par);
    this.type = 'NodeRect';
    this.color = par.color;
    //console.log(this.position);
    }
  
    draw () {
      context.clearRect(0, 0, size.x, size.y);
      context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
      
    }
  
  }
  
  var create_node = function (par) { //par от params, не путать
   if(par.type === 'rectangle')
    return new NodeRect(par);
    
  };
  
  this.create_node = function (scene, params){
   if (typeof scene.nodes === 'undefined'){
      var nds = scene.nodes = []; //массив объектов если элемента не существует
   } 
   
   var n = create_node(params); 
   nds.push(n); //Будет создавать сами ноды с характеристиками объекта
   return n; 
  };
  
  
  // Старт движка //
  _INIT();
  window.cherryEngineGlobal = cherryEngine;
  
};

var log = console.log; // на всякий случай. Думаю буду часто к ней обращаться