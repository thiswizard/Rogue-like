import chalk from 'chalk';
import readlineSync from 'readline-sync';

function random_number(min,max){
  return Math.floor(Math.random() * (max-min+1)) + min
}

class Player { // 공격 , 방어 , 카운터 , 도망치기
  constructor() {
    this.hp = 200;
    this.attackpower = 10;

  }
  attack(monster) {
    let damage = this.attackpower
    monster.hp -= damage
    return damage
  }
  shield(monster){
    let damage = monster.attackpower * 0.30
    this.hp -= damage
    return damage
  }
  counterattack(monster){
      let damage = monster.attackpower * 3
      monster.hp -= damage
      return damage
  }
  run_fail_damage(monster){
    let damage = monster.attackpower * 1.5
    this.hp -= damage
    return damage
  }
  reword_hp(){
    this.hp += 100
    return this.hp
  }
  reword_power(){
    this.attackpower += 5
    return this.attackpower
  }
  
}

class Monster {
  constructor(stage) {
    this.hp = 100;
    this.attackpower = 10;

    this.hp += (stage-1) * 20
    this.attackpower += (stage-1) * 3 
  }

  attack(player) {
    let damage = this.attackpower
    player.hp -= damage
    return damage
  }

  shield(player){
    let damage = player.attackpower * 0.20
    this.hp -= damage
    return damage
  }

}

function displayshow(stage, player, monster) { // 스테이지 , 플레이어 체력 , 몬스터 체력
  console.log(chalk.magentaBright('='.repeat(75)))
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) + chalk.blueBright(`| 플레이어 정보: HP:${player.hp} 공격력:${player.attackpower}`,) +chalk.redBright(`| 몬스터 정보 | HP:${monster.hp} 공격력:${monster.attackpower}`));
  console.log(chalk.magentaBright('='.repeat(75)));
}

const battle = async (stage, player, monster) => {  // battle 결과값 lose , win , escape
  let logs = [];

  while(player.hp > 0) {
    console.clear();
    displayshow(stage, player, monster); // 스테이지 , 플레이어 체력 , 몬스터 체력

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(`\n1.공격 2.방어 3.카운터 4.도망치기.`,)
    );

    const choice = readlineSync.question('행동을 선택해 주세요: ');

    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

    switch(choice){
      case "1": // 공격
        const damage = player.attack(monster)
        logs.push(chalk.blue(`몬스터에게 ${damage}를 피해를 입혔습니다`))
        break;
      case "2": // 방어
        const player_damage = player.shield(monster)
        logs.push(chalk.blue(`몬스터의 공격을 막아 일부에 피해 ${player_damage}만 받았습니다`))
        break;
      case "3": // 카운터
        if(random_number(1,10) > 5){
          const counter_damage = player.counterattack(monster)
          logs.push(chalk.blue(`카운터에 성공했습니다! 몬스터에게 데미지를 줍니다! ${counter_damage} `))
        }
        else{
          const counter_fail_damage = monster.attack(player)
          logs.push(chalk.blue(`카운터에 실패 했습니다! 플레이어가 데미지를 입었습니다! ${counter_fail_damage}`))
        }
        break;
      case "4": // 도망
        if(random_number(1,10) > 7){
          logs.push(chalk.blue("플레이어는 도망을 선택했습니다!"))
          readlineSync.question("엔터를 누르면 다음 스테이지로 넘어 갑니다")
          return "escape"
        }
        else{
          let escape_fail_damage = player.run_fail_damage(monster)
          logs.push(chalk.blue(`도망에 실패했고 오히려 공격을 받았습니다 ${escape_fail_damage}`))
        }
        break;
      default:
        logs.push(chalk.red("올바른 입력을 해주세요"))
    }

    // 몬스터 행동
    let The_monster_choice = random_number(1,2)
    if(The_monster_choice == 1){ // 몬스터 공격
      let THE_monster_attack = monster.attack(player) 
      logs.push(chalk.red(`몬스터가 플레이어를 공격! ${THE_monster_attack}`))
    }
    else if(The_monster_choice == 2) { // 몬스터 방패
      let THE_monster_shield = monster.shield(player)
      logs.push(chalk.red(`몬스터가 방어를 했습니다! ${THE_monster_shield}`))
    }
      


    if(monster.hp<0){
      console.log(chalk.blue("\n몬스터를 처치 했습니다"))
      
      console.log(chalk.green("1.체력증가 , 2.공격증가 , 3.스킬 확률 증가"))
      
      while(true){
      let reword_choice = readlineSync.question("받고싶은 보상을 선택하세요:")
      console.log(`선택하신 보상은 ${reword_choice}번`)
      switch(reword_choice){
        case "1": // 체력증가
          let the_reword_hp=player.reword_hp()
          console.log(`체력이 ${the_reword_hp}만큼 증가했습니다`)
          break;
        case "2": // 공격증가
          let the_reword_power = player.reword_power()
          console.log(`공격력이 ${the_reword_power}만큼 증가했습니다`)
          break;
        default :
          console.log("잘못된 값을 입력했습니다 다시 입력해주세요")
          continue
      }
      break
    }
      readlineSync.question("\n다음 스테이지로 가기 위해 엔터를 입력해주세요")
      return "win"
    }
    if(player.hp<0){
      console.log(chalk.blue("당신은 패배했습니다"))
      return "lose"
    }
  }
};


export async function startGame() {
  console.clear();
  let stage = 1;
  const player = new Player();

  while (stage <= 10) {
    
    const monster = new Monster(stage);
    const result = await battle(stage, player, monster);

    if(result == "escape"){
      console.log("다른 스테이지로 이동")
      stage++
    }else if(result == "lose"){
      console.log("게임 오버")
      break
    }
    else if(result == "win"){
      console.log("게임 클리어")
      stage++
    }
  }
  if (stage > 10) {
    console.log("게임을 클리어 했습니다!")
    
  }
console.log("게임을 종료합니다")

}