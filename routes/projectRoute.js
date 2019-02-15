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

//GET project by ID request
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

// POST project request
router.post("/", async (req, res) => {
    try {
        if (!req.body.name || !req.body.description) {
             res.status(400).json({
            errorMessage: "Please provide name and description for the project."
            });
            return;
        } 
        else {
            const project = await Projects.insert(req.body);
            res.status(201).json(project);
         }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "There was an error while saving the project."
        });
    }
});

// DELETE project request
router.delete("/:id", async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count > 0) {
            res
                .status(200)
                .json({ message: "The project has been successfully deleted" });
        } else {
            res
                .status(404)
                .json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The project could not be deleted"
        });
    }
});

// UPDATE project request
router.put("/:id", async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
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
            message: "The project information could not be modified."
        });
    }
});

module.exports = router;