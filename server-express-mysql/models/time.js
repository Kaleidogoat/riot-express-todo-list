/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('time', {
    UserId: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    clock_in: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    clock_out: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'time'
  });
};
