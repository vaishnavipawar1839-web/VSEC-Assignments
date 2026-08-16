function analyzeName() {

    let name = document.getElementById("name").value;

    if (name == "") {
        alert("Please enter your name!");
        return;
    }

    name = name.toLowerCase();

    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    let total = 0;

    for (let i = 0; i < name.length; i++) {

        let letter = name[i];

        let value = alphabet.indexOf(letter) + 1;

        if (value > 0) {
            total = total + value;
        }
    }

    let personality;
    let strength;
    let mood;
    let prediction;

    let result = total % 9;

    if (result == 1) {

        personality = "Natural Leader 👑";
        strength = "Confidence";
        mood = "Energetic ⚡";
        prediction = "You may take the lead in something new!";

    }

    else if (result == 2) {

        personality = "Caring Person 💗";
        strength = "Understanding";
        mood = "Peaceful 🌸";
        prediction = "Someone may appreciate your kindness today!";

    }

    else if (result == 3) {

        personality = "Creative Mind 🎨";
        strength = "Imagination";
        mood = "Cheerful 😊";
        prediction = "A creative idea may surprise you!";

    }

    else if (result == 4) {

        personality = "Practical Thinker 🧠";
        strength = "Planning";
        mood = "Calm 😌";
        prediction = "Your planning can help you solve a problem!";

    }

    else if (result == 5) {

        personality = "Adventurous Soul 🌍";
        strength = "Adaptability";
        mood = "Excited 🤩";
        prediction = "You may discover something interesting!";

    }

    else if (result == 6) {

        personality = "Friendly Heart 💕";
        strength = "Communication";
        mood = "Positive 🌈";
        prediction = "A good conversation may make your day!";

    }

    else if (result == 7) {

        personality = "Deep Thinker 🔮";
        strength = "Observation";
        mood = "Thoughtful 🌙";
        prediction = "You may notice something others miss!";

    }

    else if (result == 8) {

        personality = "Ambitious Mind 🚀";
        strength = "Determination";
        mood = "Focused 🎯";
        prediction = "You may make progress toward an important goal!";

    }

    else {

        personality = "Confident Spirit 🔥";
        strength = "Courage";
        mood = "Powerful 💪";
        prediction = "You may step outside your comfort zone!";
    }

    document.getElementById("result").innerHTML =

        "<h2>✨ Your Result</h2>" +

        "<b>👤 Name:</b> " + name + "<br>" +

        "<b>🧠 Personality:</b> " + personality + "<br>" +

        "<b>💪 Strength:</b> " + strength + "<br>" +

        "<b>🌈 Mood:</b> " + mood + "<br>" +

        "<b>🔮 Fun Prediction:</b> " + prediction;
}