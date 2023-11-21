import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Prayer from "./Prayer";
import moment from "moment/moment";
import Fajr from "./assets/1.jpg";
import dohr from "./assets/2.jpg";
import Asr from "./assets/3.jpg";
import Maghrib from "./assets/4.jpg";
import Isha from "./assets/5.jpg";

function MainContent(props) {
  let dat = Date.now();
  const [ville, setVille] = useState("casablanca");
  const [timings, setTimings] = useState({
    Fajr: "4:10",
    Dhuhr: "12:30",
    Asr: "16:10",
    Maghrib: "18:30",
    Isha: "19:45",
  });
  const [today, setToday] = useState(dat);
  const [nextPrayer, setNextPrayer] = useState("Fajr");
  const [timer, setTimer] = useState(0);
  const [prayedAt, setPrayedAt] = useState("");

  const availlableCities = ["Agadir", "casablanca", "meknes"];

  const handleChange = (event) => {
    setVille(event.target.value);
  };

  const getTimings = async () => {
    let url = `https://api.aladhan.com/v1/timingsByCity?city=${ville}&country=Morocco&method=8`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      console.log("error");
    }

    setTimings(data.data.timings);
    setToday(data.data.date.readable);
  };

  useEffect(() => {
    getTimings();
  }, [ville]);

  useEffect(() => {
    let interval = setInterval(() => {
      //setupCountDownTimer();
    }, timer);

    setupCountDownTimer();

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const setupCountDownTimer = () => {
    let momentNow = moment();

    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      setNextPrayer("Dhur");
    } else if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      setNextPrayer("Asr");
    } else if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))
    ) {
      setNextPrayer("Maghrib");
    } else if (
      momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      setNextPrayer("Isha");
    } else {
      setNextPrayer("Fajr");
    }

    let diff = 0;
    switch (nextPrayer) {
      case "Dhur":
        diff = moment(timings.Dhuhr, "hh:mm").diff(momentNow, "hh:mm");
        break;

      case "Asr":
        diff = moment(timings.Asr, "hh:mm").diff(momentNow, "hh:mm");
        break;

      case "Maghrib":
        diff = moment(timings.Maghrib, "hh:mm").diff(momentNow, "hh:mm");
        break;
      // cas special
      case "Isha":
        diff = moment(timings.Isha, "hh:mm").diff(momentNow, "hh:mm");
        break;
      case "Fajr":
        const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
        const fajrToModnightDiff = moment(timings.Fajr, "hh:mm:ss").diff(
          moment("00:00:00", "hh:mm:ss")
        );
        diff = midnightDiff + fajrToModnightDiff;
        break;
    }

    setTimer(diff);
    const durationRemainingTime = moment.duration(diff);
    setPrayedAt(
      `${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`
    );
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{ville}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>Prière suivante {nextPrayer}</h2>
            <h1> {prayedAt}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      <Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"space-around"}
          style={{ marginTop: "20px" }}
        >
          {timings && <Prayer name="Fajr" time={timings.Fajr} img={Fajr} />}
          {timings && <Prayer name="Dhuhr" time={timings.Dhuhr} img={dohr} />}
          {timings && <Prayer name="Asr" time={timings.Asr} img={Asr} />}
          {timings && (
            <Prayer name="Maghrib" time={timings.Maghrib} img={Maghrib} />
          )}
          {timings && <Prayer name="Isha" time={timings.Isha} img={Isha} />}
        </Stack>
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl variant="outlined" sx={{ m: 1, width: 200, color: "red" }}>
          <InputLabel>
            <span style={{ color: "white" }}>Ville </span>
          </InputLabel>
          <Select
            value={ville}
            label="cities"
            onChange={handleChange}
            style={{ color: "white" }}
          >
            {availlableCities.map((c, index) => (
              <MenuItem key={index} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default MainContent;
