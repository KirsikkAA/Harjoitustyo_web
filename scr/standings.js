const apiURL = "https://api.jolpi.ca/ergast/f1/2025/driverstandings.json";

    fetch (apiURL)
    .then(res => res.json())
    .then(data => {
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const tbody = document.querySelector("#standings tbody"); 

        standings.forEach(d => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="position">${d.position}</td>
            <td>${d.Driver.givenName} ${d.Driver.familyName}</td>
            <td>${d.Constructors[0].name}</td>
            <td class="points">${d.points}</td>
            `;
            tbody.appendChild(row);
        });
    })
     .catch(err => console.error("Error loading standings:", err));