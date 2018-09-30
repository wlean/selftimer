'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Task = app.model.define(
    'task',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      done_at: {
        type: DataTypes.DATE,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    }
  );

  Task.associate = function() {
    app.model.Task.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };

  Task.findByUser = async function(userid) {
    return await this.findone({
      where: { user_id: userid },
    });
  };

  return Task;
};
