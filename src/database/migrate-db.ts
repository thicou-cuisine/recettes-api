import User from './../models/User'

console.log(`starting migration to : ${process.env.NODE_ENV === 'test' ? 'test env' : 'regular env'}`)
const main = () => {
  User.sync({ alter : true })
}

main()

