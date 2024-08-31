module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    player1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Players",
        key: "id",
      },
    },
    player2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Players",
        key: "id",
      },
    },
    winnerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // It may be void if the game results in a draw
      references: {
        model: "Players",
        key: "id",
      },
    },
    victoryCondition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Game.associate = function (models) {
    Game.belongsTo(models.players, { as: "Player1", foreignKey: "player1Id" });
    Game.belongsTo(models.players, { as: "Player2", foreignKey: "player2Id" });
    Game.belongsTo(models.players, { as: "Winner", foreignKey: "winnerId" });
  };

  return Game;
};
