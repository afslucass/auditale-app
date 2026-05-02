import "@supabase/functions-js/edge-runtime.d.ts"
import express from "npm:express@4.18.2";

const app = express();

app.get('secret', (req, res) => {
  res.send("Welcome to");
});

app.get('paid-plan-payment', (req, res) => {
  res.send("Welcome to Supabase");
});

app.listen(8000);