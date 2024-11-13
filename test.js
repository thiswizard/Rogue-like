import chalk from "chalk"
import readlineSync from "readline-sync"

console.log(chalk.green("1.체력증가 , 2.공격증가 , 3.스킬 확률 증가"))
let gift_choice = readlineSync.question("받고싶은 보상을 선택하세요:")
console.log(`선택한 번호는 ${gift_choice}`)