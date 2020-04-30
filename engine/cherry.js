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
// Basic engine for writing web games in html and javascript. At the moment it is still being developed.
// этот движок работает с тегом Canvas. Достоинства - максимальная производительность.
// Движок создан при поддержке Alcoshopers Lab
// Автор: IndestructibleA   GitHub: https://github.com/IndestructibleA 

var Cherry = function(_box, _layers){
   'use strict';
  var Cherry = this; //ссылка на себя
        
        // Глобальные переменные //
  var 
        size = null
        ,canvas_offset = null
        ,running = false
        ,active_scene = null
        ,layer = null
        
        
        // CONFIG //      
  
  var config = {
    font_size : 50,
    font_name : 'serif',
    font_base_line : 'top'
    
  };
  
    // AUDIO //
  
  function loadAudio(arr, vol) {
 let audio = document.createElement('audio');
  for (let i = 0, len = arr.length; i < len; i+= 1) {
  	let source = document.createElement("source");
  	 source.src = arr[i];
  	 audio.appendChild(source);

  }
  audio.volume = 1 || vol;

  //delete source;
  
  let o = {
  	dom : false,
  	
  	play : function () {
  	this.dom.currentTime = 0;
    this.dom.play();
  	this.state = 'play';	
  	},
  	pause : function () {
  	this.dom.pause();
  	this.state = 'pause';	
  	},
  	stop : function () {
    this.dom.pause();
    this.dom.currentTime = 0;
    this.state = 'stop';
  	},

    setVolume : function (vol) {
      this.dom.volume = vol;
    }
  
  };
  o.dom = audio;
  return o;	
}


let shoot = loadAudio(['audio/bolter_1.mp3', 'audio/sample.wav', 'audio/sample.ogg']);
let ambient = loadAudio(['audio/ambient.mp3'], 0.4);
let a;

 //shoot.setVolume(0.9); //динамическое изменение громкости
ambient.play();

setInterval(function () {
 if (a == 32) {
  shoot.play();
  }
 if (a == 17) {
  ambient.play();
  } 

 if (a == 27) {
  ambient.stop();
  }  
  a = 0;

 }, 20);
 
 let body = document.getElementById('body');
 body.onkeyup = function (e) {
 a = e.keyCode;
 console.log(e.keyCode);
 };


  
        
        //  _INIT инициализация //
  var _INIT = function(){  
    if (typeof _box !== 'object') _box = document.getElementById(_box);
    
    var box = _box.getBoundingClientRect();
    canvas_offset = vector2(box.left, box.top);
    size = vector2(box.width, box.height);
    if (typeof _layers === 'object'){
      var i, j = 0;
      for (i in _layers) {
         Cherry.create_layer(i, j, !!_layers[i].auto_clear); //!! для булевого значения без лишних проверок
         j++;
      }
      
    } else {
    Cherry.create_layer('main', 0, true); 
    Cherry.select_layer('main');
    }
    
    //context.fillText('Canvas инициализирован', 30, 20); 
    

  };
  
  // MATH //
  var int = function (num) { // проверка на число
    return isNumber(num) ? num : 0;
  };
  
  // LAYERS - Слои  //
  var layers = {};
  var clear_layers = [];
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
      var dpar = vpar(par.x, par.y);
      
      if (par.color) {
      this.ctx.fillStyle = par.color;
      this.ctx.fillRect(dpar.x, dpar.y, par.width, par.height);
      }
      
      if (par.border) {
        this.ctx.strokeStyle = par.border;
        this.ctx.strokeRect(dpar.x, dpar.y, par.width, par.height);
        
      }  
    }
    
    draw_circle (par) {
      var dpar = vpar(par.x, par.y);
      
      this.ctx.fillStyle = par.color;
        this.ctx.beginPath();
      	this.ctx.arc(dpar.x+par.radius, dpar.y+par.radius, par.radius, 0, 2*Math.PI, false);
	   	  
	   	  if(par.color) {
	   	  this.ctx.fillStyle = par.color;
	   	  this.ctx.fill();
	   	  }
      
      if (par.border) {
        this.ctx.strokeStyle = par.border;
        this.ctx.stroke();
      }  
    }
    
    draw_text (par) {
      
      if (par.font || par.size) 
      this.ctx.font = (par.size || config.font_size)+'px '+(par.font || config.font_name);
      
      this.ctx.textBaseLine = config.font_base_line;
      
      if (par.color) {
      this.ctx.fillStyle = par.color;
      this.ctx.fillText(par.text, par.x, par.y);
      }
    }
    
  }
  Cherry.create_layer = function (id, index, is_auto_clear) {
    if (layers[id]) return;
    layers[id] = new Layer(index);
    if (is_auto_clear) clear_layers.push(layers[id]);
  
  };
  
  Cherry.select_layer = function(id) {
   if (!layers[id]) return;
   layer = layers[id];
   
  };
  
  Cherry.get_layer = function(id){
    if (!layers[id]) return;
    return layers[id];
  };
  
  
  
  // VECTORS Вектора //
  class Vector2 {
    constructor (x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
    plus (v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
    minus (v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }
  
  
  
  
  var vector2 = this.vector2 = function(x, y){
    return new Vector2(x, y);
  };
  
  // ENGINE - Движок //
  
  var _update = function() {
  active_scene.update_nodes();
  active_scene.update();
  
  var i = clear_layers.length-1;
  for (;i>=0; i--) {
    clear_layers[i].clear();
  }
  active_scene.draw_nodes();
  active_scene.draw();
    
  if (running) requestAnimationFrame(_update); //Цикл анимации
  };
  
  this.start = function (name) {
   if (running) return;
   running = Cherry.set_scene(name);
   if (running) {
     _update();
   }
  };

  // SCENES - Сцены. //
  var scenes = {};
  
  class Scene { //вспомогательный класс
    constructor (scn) {
     this.scene = scn;
     this.count_nodes = 0;
     
    }
    
    init () {
      this.scene.init();
      this.count_nodes = this.scene.nodes.length;
    }
    
     update_nodes () {
      var i = 0;
      for (;i < this.count_nodes; i++) {
        if (typeof this.scene.nodes[i].draw !== 'undefined') {
        this.scene.nodes[i].update();
          
        }
      }
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
      var i = 0;
      for (;i < this.count_nodes; i++) {
        if (typeof this.scene.nodes[i].draw !== 'undefined') {
        this.scene.nodes[i].draw();
          
        }
      }
    }
  
  }
  
  this.create_scene = function (name, Construct){
    if (scenes[name]) return; //проверка на похожие имена сцены
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
  
  
  // NODES - Ноды. //
  class Node {          //Базовый класс
   constructor (par) {
     this.position = par.position;
     this.size = par.size;
     this.type = 'Node';
     this.layer = par.layer || 'main'; //kostil
     
     
   } 
    
    move (par) { //Перемещение
      
      this.position.plus(par);
    }
    
    draw_box (color) {
        layers[this.layer].draw_rect({
        x : this.position.x,
        y : this.position.y,
        width : this.size.x,
        height : this.size.y,
        border : color || '#ffff00'
        
      });
      
        layers[this.layer].draw_text({
        x : this.position.x + this.size.x,
        y : this.position.y,// + this.size.y,
        text : 'Планета: Cherry '+this.size.x+' x '+this.size.y,
        size : 30,
        color : '#ffff00'
        
      });
      
    }
    
  }
  
  class RectNode extends Node { // создает нод rectangle
    constructor (par){
    super (par);
    this.type = 'RectNode';
    this.color = par.color;
    //console.log(this.position);
    }
  
    draw () {
      layers[this.layer].draw_rect({
        x : this.position.x,
        y : this.position.y,
        width : this.size.x,
        height : this.size.y,
        color : this.color
        
      });
      
    }
  
  }
  
   class CircleNode extends Node { //наследует класс Node
    constructor (par) {
    super(par);
    this.type = 'CircleNode';
    this.color = par.color;
    this.radius = par.radius;
    this.size = vector2();
    }
    
    update () {
      this.size.x = this.size.y = this.radius * 2;
    
    }
  
    draw () {
      layers[this.layer].draw_circle({
        x : this.position.x,
        y : this.position.y,
       
        radius : this.radius,
        color : this.color
        
      });
      
    }
  
  }
  
  
  var create_node = function (par) { //par от params, не путать
   if(par.type === 'rectangle')
    return new RectNode(par);
   else if(par.type === 'circle')
    return new CircleNode(par);  
    
  };
  
  this.create_node = function (scene, params){
   if (typeof scene.nodes === 'undefined'){
      var nds = scene.nodes = []; //массив объектов если элемента не существует
   } 
   
   var n = create_node(params); 
   nds.push(n); //Будет создавать сами ноды с характеристиками объекта
   return n; 
   
  };
  
  // VIEWPORT - Позиция камеры //
 var view = Cherry.view = new function () {
   this.position = vector2();
   this.scale = vector2(1,1);
   
   this.move = function (v) {
     this.position.plus(v);
     
   };
   
  };
    
    var vpar = function (x, y) {
    return vector2(x, y).minus(view.position);
  };

  

  
  
  
  // Старт движка //
  _INIT();
  window.CherryGlobal = Cherry;
  
};

var log = console.log; // на всякий случай. Думаю буду часто к ней обращаться


//end
