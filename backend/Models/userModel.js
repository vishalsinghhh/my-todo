module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              isEmail: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
      timestamps: true
  });

  User.associate = models => {
      User.hasMany(models.List, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
      });
  };

  return User;
};
