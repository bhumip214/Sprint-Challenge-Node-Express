const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");

router.use(express.json());

// GET projects request
router.get("/", async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The projects information could not be retrieved."
        });
    }
});

//GET user by ID request
router.get("/:id", async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);

        if (project) {
            res.status(200).json(project);
        } else {
            res
                .status(404)
                .json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The project information could not be retrieved."
        });
    }
});

module.exports = router;