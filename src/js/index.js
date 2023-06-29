import { useSum } from './sum'
// import '../assets/styles/index.scss'
// import '@/assets/styles'

console.log('main.js')
console.log(useSum(1, 3))

const p = new Promise((resolve, reject) => {
  console.log('new Promise执行了')

  setTimeout(() => {
    resolve(100)
    // reject(-100)
  }, 2000)
})

p.then(
  value => console.log(value), // 成功的异步回调
  reason => console.log(reason) // 失败的异步回调
)

console.log('first')
