// all of the login logic here
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send("This is the login router")
})

export default router;