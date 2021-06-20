class Player {
    constructor(){
      this.index = null;
      this.score = 0;
      this.name = null;
      this.rank = null;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        score:this.score,
        rank:this.rank
      });
    }

    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value", (data) => {
        allPlayers = data.val();
      });
    }

    redDuckr(redDuck, rWorm){
      rWorm.destroy();
      player.score++;
      player.update();
    }

    redDuckb(redDuck, bWorm){
      bWorm.destroy();
      player.score--;
      player.update();
    }

    blueDuckr(blueDuck, rWorm){
      rWorm.destroy();
      player.score--;
      player.update();
    }

    blueDuckb(blueDuck, bWorm){
      bWorm.destroy();
      player.score++;
      player.update();
    }

    getRanks(){
      var p1ref = database.ref('players/player1');
      p1ref.on("value", (data)=>{
        p1 = data.val();
      });

      var p2ref = database.ref('players/player2');
      p2ref.on("value", (data)=>{
        p2 = data.val();
      });

      var ranksRef1 = database.ref('players/player1/score');
      ranksRef1.on("value", (data)=>{
        p1rank = data.val();
      });
      var ranksRef2 = database.ref('players/player2/score');
      ranksRef2.on("value", (data)=>{
        p2rank = data.val();
      })

      if(p1rank > p2rank){
        p1.rank = 1;
        p2.rank = 2;

        database.ref('/').update({
          rank:rank
        })
      }
      else if(p2rank > p1rank){
        p1.rank = 2;
        p2.rank = 1;
      }
    }
}