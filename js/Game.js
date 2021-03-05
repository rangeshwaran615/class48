class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    fish1 = createSprite(100,200);
    fish1.addImage("fish1",fish1_img);
    fish2 = createSprite(300,200);
    fish2.addImage("fish2",fish2_img);
    fish3 = createSprite(500,200);
    fish3.addImage("fish3",fish3_img);
    fish4 = createSprite(700,200);
    fish4.addImage("fish4",fish4_img);
    fish = [fish1, fish2, fish3, fish4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getFishAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        fish[index-1].x = x;
        fish[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("blue");
          ellipse(x,y,40,40);
          fish[index - 1].shapeColor = "blue";
          camera.position.x = displayWidth/2;
          camera.position.y = fish[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3570){
      gameState = 2;
      player.rank +=1
      Player.updateFishAtEnd(player.rank)
    
    }
   
    drawSprites();
    
    textSize(25)
    text("YOU WIN",displayWidth/2,3470)
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
