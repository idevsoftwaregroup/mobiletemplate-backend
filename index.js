import "dotenv/config";

import data from './Data/mock.json' with { type: 'json' };
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
  // console.log(`Mock data:`, readData());
  // console.log(`Finder result:`, finder(25));
});
