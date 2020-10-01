import User from './../models/User'

const main = () => {
  User.sync({ force : true })
}

main()

