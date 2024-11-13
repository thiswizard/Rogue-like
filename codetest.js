// 13. `fetchData`라는 비동기 함수를 `Promise`를 사용하여 작성하고, 
// 데이터가 성공적으로 가져와지면 "데이터 로드 성공"을, 실패하면 "데이터 로드 실패"를 출력하는 코드를 작성하세요.

async function fetchData() {
    return new Promise((resolve , reject) => {
        let test = true
        if (test){
            resolve("데이터 로드 성공")
        }
        else{
            reject("데이터 로드 실패")
        }
    })   
}

async function mainData() {
    console.log("결과가 나올것입니다")
    let cake = await fetchData()
    console.log(cake)
    
}


mainData()