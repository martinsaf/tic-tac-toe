module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalWins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Player.associate = function (models) {
    Player.hasMany(models.games, {
      foreignKey: "winnerId",
    });
  };

  return Player;
};
