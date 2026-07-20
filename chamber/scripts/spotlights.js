const spotlightsContainer =
document.getElementById("spotlights-container");

const membershipLevels = {
    2: "Silver",
    3: "Gold"
};

async function loadSpotlights() {

    try{

        const response =
        await fetch("data/members.json");

        const members =
        await response.json();

        const qualifiedMembers =
        members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

        qualifiedMembers.sort(() =>
            Math.random() - 0.5
        );

        const selected =
        qualifiedMembers.slice(0,3);

        displaySpotlights(selected);

    }
    catch(error){
        console.error(error);

        spotlightsContainer.innerHTML =
        "<p>Unable to load member spotlights.</p>";
    }

}

function displaySpotlights(members){

    spotlightsContainer.innerHTML = "";

    members.forEach(member=>{

        const card =
        document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `

            <img
                src="${member.image}"
                alt="${member.name}"
                loading="lazy">

            <h3>${member.name}</h3>

            <p><strong>${membershipLevels[member.membership]} Member</strong></p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <a href="${member.website}"
            target="_blank">
            Visit Website
            </a>

        `;

        spotlightsContainer.appendChild(card);

    });

}

document.addEventListener("DOMContentLoaded", loadSpotlights);