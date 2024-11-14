import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Monster } from './monster.js';
import { Player } from './player.js';

function random_number(min,max){
  return parseFloat(Math.floor(Math.random() * (max-min+1)) + min)
}



function displayshow(stage, the_difficulty ,player, monster) { // 스테이지 , 플레이어 체력 , 몬스터 체력
  console.log(chalk.magentaBright('='.repeat(90)))
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) + chalk.cyanBright(`| 난이도: ${the_difficulty} `) + chalk.blueBright(`| 플레이어 정보: HP:${player.hp} 공격력:${player.attackpower} 스킬행운:${player.luck}`,) +chalk.redBright(`| 몬스터 정보 | HP:${monster.hp} 공격력:${monster.attackpower}`));
  console.log(chalk.magentaBright('='.repeat(90)));
}

const battle = async (stage, the_difficulty ,player, monster) => {  // battle 결과값 lose , win , escape
  let logs = [];

  while(player.hp > 0) {
    console.clear();
    displayshow(stage, the_difficulty ,player, monster); // 스테이지 , 플레이어 체력 , 몬스터 체력

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(`\n1.공격 2.방어 3.카운터(50%) 4.도망치기(30%).`,)
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
          readlineSync.question("도망에 성공했습니다! 엔터를 누르면 다음 스테이지로 넘어 갑니다")
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
      player.kill_monster()
      console.log(chalk.green("1.체력증가 , 2.공격증가 , 3.스킬 행운 증가"))
      
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
        case "3": // 행운증가
          let the_reword_luck = player.reowrd_lcuk()
          console.log(`스킬행운 이 ${the_reword_luck} 만큼 증가했습니다`)
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
  let the_difficulty = ""
  while(true){
    console.log(chalk.blue("1.초급 2.중급 3.고급"))
    let difficulty = readlineSync.question("원하시는 난이도를 선택하세요(1~3번 선택):")
    switch(difficulty){
      case "1" :
        the_difficulty = "초급"
        console.log(chalk.green(`${the_difficulty} 난이도를 선택하셨습니다`))
        break;
      case "2" :
        the_difficulty = "중급"
        console.log(chalk.blue(`${the_difficulty} 난이도를 선택하셨습니다`))
        player.max_hp = player.max_hp - 50
        player.hp = player.max_hp
        player.max_attackpower = player.max_attackpower -3
        player.attackpower = player.max_attackpower
        player.max_lcuk = player.max_lcuk -1
        player.luck = player.max_lcuk
        break;
      case "3" :
        the_difficulty = "고급"
        console.log(chalk.red(`${the_difficulty} 난이도를 선택하셨습니다`))
        player.max_hp = player.max_hp - 100
        player.hp = player.max_hp
        player.max_attackpower = player.max_attackpower -5
        player.attackpower = player.max_attackpower
        player.max_lcuk = player.max_lcuk -2
        player.luck = player.max_lcuk
        break;
      default :
        console.log("올바른 선택을 하세요(1번~3번)")
        continue
    }
    break
  }


  while (stage <= 10) {
    
    const monster = new Monster(stage);
    const result = await battle(stage, the_difficulty,  player, monster);

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