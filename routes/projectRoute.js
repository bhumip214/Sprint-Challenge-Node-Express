const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

router.use(express.json());

const charlimit = (req, res, next) => {
    const description = req.body.description;
    if (description.length <= 128) {
        next();
    } else {
        res
            .status(400)
            .json({ message: "Description must be 128 characters or less." });
    }
};

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

//GET project actions request
router.get("/:id/actions", async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The actions information for a project could not be retrieved."
        });
    }
});

//GET action by ID request
router.get("/:id/actions/:actionId", async (req, res) => {
    try {
        const action = await Actions.get(req.params.actionId);

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

// POST action request
router.post("/:id/actions", charlimit, async (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id };
    try {
        if (!req.body.description || !req.body.notes) {
            res.status(400).json({
                errorMessage: "Please provide the description and notes for the action."
            });
        } else {
            const action = await Actions.insert(actionInfo);
            res.status(201).json(action);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "There was an error while saving the action."
        });
    }
});

// DELETE action request
router.delete("/:id/actions/:actionId", async (req, res) => {
    try {
        const count = await Actions.remove(req.params.actionId);
        console.log("Count is ", count);
        if (count > 0) {
            res
                .status(200)
                .json({ message: "The action has been successfully deleted" });
        } else {
            res
                .status(404)
                .json({ message: "The action with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The action could not be deleted"
        });
    }
});

// UPDATE action request
router.put("/:id/actions/:actionId", async (req, res) => {
    try {
        const action = await Actions.update(req.params.actionId, req.body);
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
            message: "The action information could not be modified."
        });
    }
});

module.exports = router;