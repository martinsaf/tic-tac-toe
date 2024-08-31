const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get("/leaderboard", async (req, res) => {
  try {
    const players = await db.players.findAll({
      order: [["totalWins", "DESC"]],
    });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/players", async (req, res) => {
  try {
    const player = await db.players.create({
      name: req.body.name,
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/games", async (req, res) => {
  try {
    const game = await db.games.create({
      player1Id: req.body.player1Id,
      player2Id: req.body.player2Id,
      winnerId: req.body.winnerId,
      victoryCondition: req.body.victoryCondition,
    });
    if (req.body.winnerId) {
      const winner = await db.players.findByPk(req.body.winnerId);
      winner.totalWins += 1;
      await winner.save();
    }
    res.status(201).json(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
  });
});
