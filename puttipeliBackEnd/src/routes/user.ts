// all of the user logic here
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send("This is the user router")
})

export default router;