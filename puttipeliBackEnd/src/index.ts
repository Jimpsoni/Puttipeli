import app from "./app"
import { log } from "./services/logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`)
})
