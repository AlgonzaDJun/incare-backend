const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.createMeeting = async (topic, duration, start_time) => {
  const authToken = process.env.ZOOM_AUTH_TOKEN;
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const api_base_url = "https://api.zoom.us/v2";

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
        accountId,
      headers: {
        Authorization: "Basic " + authToken,
      },
    };

    let authResponse;

    await axios
      .request(config)
      .then((response) => {
        authResponse = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const access_token = authResponse.access_token;

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    let data = JSON.stringify({
      topic: topic,
      type: 2,
      start_time: start_time,
      duration: duration,
      password: "12345",
      settings: {
        join_before_host: true,
        waiting_room: false,
      },
    });

    const meetingResponse = await axios.post(
      `${api_base_url}/users/me/meetings`,
      data,
      { headers }
    );

    if (meetingResponse.status !== 201) {
      console.log("Unable to generate meeting link");
      return;
    }

    const response_data = meetingResponse.data;

    const content = {
      meeting_url: response_data.join_url,
      password: response_data.password,
      meetingTime: start_time,
      purpose: response_data.topic,
      duration: response_data.duration,
      message: "Success",
      status: 1,
    };

    // console.log(content);
    return content;
  } catch (error) {
    return error;
  }
};
