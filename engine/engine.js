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

var cherryEngine = function(_box){
   'use strict';
  var cherryEngine = this; //ссылка на себя
        
        // Глобальные переменные //
  var 
        size = null
        ,canvas_offset = null
        ,running = false
        ,active_scene = null
        ,layer = null
        
        //  _INIT инициализация //
  var _INIT = function(){  
    if (typeof _box !== 'object') _box = document.getElementById(_box);
    
    
    
    var box = _box.getBoundingClientRect();
    canvas_offset = vector2(box.left, box.top);
    size = vector2(box.width, box.height);
    cherryEngine.create_layer('main', 0);
    cherryEngine.select_layer('main');
    
    //context.fillText('Canvas инициализирован. Жду дальнейших инструкций', 30, 20); 
    

  };
  
  // MATH //
  var int = function (num) { // проверка на число
    return isNumber(num) ? num : 0;
  };
  
  // LAYERS - Слои  //
  var layers = {};
  class Layer {
    constructor (index){
     var cnv = document.createElement('canvas');
     cnv.style.cssText = 'position: absolute; left: '+canvas_offset.x+'px; top: '+canvas_offset.y+'px;';
     cnv.width = size.x;
     cnv.height = size.y;
     cnv.style.zIndex = 100 + index;
     document.body.appendChild(cnv);
     
     this.canvas = cnv;
     this.ctx = cnv.getContext('2d');
     
    }
    
    clear () {
      this.ctx.clearRect(0, 0, size.x, size.y);
      
    }
    
    draw_rect (par) {
      this.ctx.fillStyle = par.color;
      this.ctx.fillRect(par.x, par.y, par.width, par.height); 
      
    }
    
    
  }
  cherryEngine.create_layer = function (id, index) {
    if (layers[id]) return;
    layers[id] = new Layer(index);
  
  };
  
  cherryEngine.select_layer = function(id) {
   if (!layers[id]) return;
   layer = layers[id];
  };
  
  
  
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
      layer.draw_rect({
        x : this.position.x,
        y : this.position.y,
        width : this.size.x,
        height : this.size.y,
        color : this.color
        
      });
      
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


//end