 /*                                                                                                                                        
                                                     
 _____ _                      _____         _         
|     | |_ ___ ___ ___ _ _   |   __|___ ___|_|___ ___ 
|   --|   | -_|  _|  _| | |  |   __|   | . | |   | -_|
|_____|_|_|___|_| |_| |_  |  |_____|_|_|_  |_|_|_|___|
                      |___|            |___|          
                                                    
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
        ,context = null; //расположение канваса
        
        //Инициализация движка через _INIT //
  var _INIT = function(){  
    if (typeof _canvas !== 'object') canvas = document.getElementById(_canvas);
    else canvas = _canvas;
    context = canvas.getContext('2d');
    size = vector2(canvas.width , canvas.height);
    
    var pos = canvas.getBoundingClientRect();
    canvas_offset = vector2(pos.left, pos.right);
    context.fillText('Canvas инициализирован. Жду дальнейших инструкций', 50, 50); 
    
   // console.log(size.y);
  };
  
  // VECTORS Вектора //
  var Vector2 = function(x, y){ // не путать с vector2. Это прародитель
  this.x = x;
  this.y = y;
  };
  
  Vector2.prototype = {
    
  };
  
  var vector2 = this.vector2 = function(x, y){
    return new Vector2(x, y);
  };
  
  //SCENES - Сцены. //
  var scenes = {};
  this.create_scene = function (name, Construct){
   var scn = new Construct(); //новый конструкт сцены. Короче сюда будут отправляться характеристики чокаве
   console.log(scn);
   
    
  };
  
  
  //NODES - Ноды. Они же игровые объекты.//
  this.create_node = function (scene, params){
   if (typeof scene.nodes === 'undefined'){
      var nds = scene.nodes = []; //массив объектов 
   } 
   nds.push(params);
    
  };
  
  
  //Старт движка//
  _INIT();
  window.cherryEngineGlobal = cherryEngine;
  
};