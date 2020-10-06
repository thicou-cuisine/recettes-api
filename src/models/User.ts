import { DataTypes } from 'sequelize'
import dbclient from './../database/database-client'
import bcrypt from 'bcrypt'
import config from './../config'

const User = dbclient.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 32],
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['password'] },
      where: {
        active: true
      }
    },
    scopes: {
      deleted: {
        where: {
          deleted: true
        }
      }
    }
  }
)

User.beforeCreate(async (user: any) => {
  user.password = await user.hashPassword()
})
User.beforeSave(async (user: any) => {
  user.password = await user.hashPassword()
})
User.prototype.compareHash = async function (inputPassword: String) {
  if (!inputPassword) {
    return false
  }
  const match = await bcrypt
    .compare(inputPassword, this.password)
    .then((matches) => matches)
    .catch((err) => {
      throw Error(err)
    })
    if (!match) {
      return false
    }
    return true
}
User.prototype.hashPassword = async function () {
  if (!this.changed('password')) {
    return 0
  }
  const { SALT_ROUNDS } = config
  const salt = await bcrypt.genSalt(Number(SALT_ROUNDS))
  if (!salt) {
    throw Error('Something bad happened')
  }
  const hash = await bcrypt
    .hash(this.password, salt)
    .then((hash) => {
      return hash
    })
    .catch((err) => {
      if (err) {
        console.log(err)
        throw Error('Invalid Input')
      }
    })
  if (!hash) {
    return false
  }
  this.password = hash
  return this.password
}

export default User
