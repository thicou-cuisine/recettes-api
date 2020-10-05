import { DataTypes, Model } from 'sequelize';
import dbclient from './../database/database-client';

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { is: /^[0-9a-z_]+$/i, len: [1, 32] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'User',
    sequelize: dbclient,
    timestamps: true
  }
);

export default User;
