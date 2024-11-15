function random_number(min,max){
    return parseFloat(Math.floor(Math.random() * (max-min+1)) + min)
  }


export class Monster {
    constructor(stage) {
      this.hp = 100;
      this.attackpower = 10;
  
      this.hp += (stage-1) * 20
      this.attackpower += (stage-1) * 3 
    }
  
    attack(player) {
      let damage = this.attackpower.toFixed(0)
      player.hp -= damage
      return damage
    }
  
    shield(player){
      let damage = (player.attackpower * 0.20).toFixed(0)
      this.hp -= damage
      return damage
    }
  
  }