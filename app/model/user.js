'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pwd: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    }
  );

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts' });
  };

  return User;
};
