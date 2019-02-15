const express = require("express");
const router = express.Router();

const Actions = require("../data/helpers/actionModel");

router.use(express.json());

// GET actions request
router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The actions information could not be retrieved."
    });
  }
});

//GET action by ID request
router.get("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);

    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The action information could not be retrieved."
    });
  }
});

module.exports = router;
