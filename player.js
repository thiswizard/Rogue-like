function random_number(min,max){
    return parseFloat(Math.floor(Math.random() * (max-min+1)) + min)
  }

export class Player { // 공격 , 방어 , 카운터 , 도망치기
    constructor() {
      this.max_hp = 200
      this.hp = 200;
      this.max_lcuk = 1
      this.luck = 1
      this.max_attackpower = 10
      this.attackpower = 10;
      
  
    }
    attack(monster) {
      let damage = this.attackpower
      monster.hp -= damage
      return damage
    }
    shield(monster){
      let damage = (monster.attackpower * 0.30 / this.luck).toFixed(0)
      this.hp -= damage
      return damage
    }
    counterattack(monster){
        let damage = (monster.attackpower * 3 * this.luck).toFixed(0)
        monster.hp -= damage
        return damage
    }
    run_fail_damage(monster){
      let damage = (monster.attackpower * 1.5 / this.luck).toFixed(0)
      this.hp -= damage
      return damage
    }
    kill_monster(){
      this.hp = this.max_hp
      this.attackpower = this.max_attackpower
      this.luck = this.max_lcuk
    }
    reword_hp(){
      let the_hp = random_number(1,100)
      this.max_hp += the_hp
      this.hp = this.max_hp
      return the_hp
    }
    reowrd_lcuk(){
      let the_luck = parseFloat(((Math.random() * 0.8) + 1.1).toFixed(1));
      this.max_lcuk += the_luck
      this.luck = this.max_lcuk
      return the_luck
    }
    reword_power(){
      let the_power = random_number(1,10)
      this.max_attackpower += the_power
      this.attackpower = this.max_attackpower
      return the_power
    }
    
  }