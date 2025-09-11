import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY, // or process.env.MIX_PUSHER_APP_KEY for Mix
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
});

window.Echo.channel("blog-app-channel").listen("PostProcessed", (e) => {
    console.log("New blog post has been created:", e);
});
