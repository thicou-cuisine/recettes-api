import User from './../models/User'

const main = () => {
  User.sync({ alter : true })
}

main()

