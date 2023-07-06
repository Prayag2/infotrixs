const projectWrapper = document.querySelector(".projects-wrapper");

function sortByDate(arr, key) {
  return arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));
}

function sortByKey(arr, key) {
  return arr.sort((a, b) => b[key] - a[key]);
}

function formatString(txt) {
  txt = txt.replaceAll("_", " ").replaceAll("-", " ").replaceAll("kde", "KDE");
  txt = txt.split(" ");
  txt = txt.map((item) => item[0].toUpperCase() + item.slice(1));
  return txt.join(" ");
}

function updateData(projects) {
  sortByKey(projects, "stargazers_count");
  projects = projects.slice(0, 10);
  sortByDate(projects, "created_at");

  projects.forEach((project) => {
    let projDate = new Date(project.created_at);
    let projMonth = projDate.toLocaleString("default", { month: "long" });

    projectHTML = `<div class='project'> \
          <h2 class='project-date'>${projMonth.toUpperCase()} ${projDate.getFullYear()}</h2> \
          <h4 class='project-title'><i class="fa-solid fa-star"></i> ${
            project.stargazers_count
          } ∙ ${formatString(project.name)} </h4> \
          <p class='project-description'>${
            project.description ? project.description : "No description."
          }</p> \
          <div class='project-buttons'> \
            <a class='button' href='${
              project.html_url
            }' target="_blank"><i class='fa-brands fa-github'></i>GitHub</a> \
          </div> \
       </div>`;
    projectWrapper.innerHTML += projectHTML;
  });
}

function fetchData() {
  let repos;

  fetch("https://api.github.com/users/prayag2/repos")
    .then((status) => status.json())
    .then((data) => updateData(data))
    .catch((err) => console.log("Couldn't fetch data from GitHub!", err));
}

fetchData();
