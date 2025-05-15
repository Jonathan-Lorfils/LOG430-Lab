import express from 'express';

const app = express()

app.get('/', (req, res) =>
    res.json({content: 'Hello World !'})
)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`app available on http://localhost:${port}`))