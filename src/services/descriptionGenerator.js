class descriptionGenerator {
  constructor() {
    this.description = "";
  }

  specialistDesciption(
    email,
    experience,
    file,
    links,
    location,
    methodOfCommunication,
    name,
    otherExperience,
    perHour,
    position,
    salary,
    share,
    strengths,
    surname,
    countryToRelocate,
    profession,
    directions
  ) {
    let hashTags = "";
    // console.log(directions);
    if (Array.isArray(directions.split(","))) {
      directions.split(",").forEach((item) => {
        item = item.replace(/\s/g, "");
        hashTags += `#${item} `;
      });
    }
    else {
        hashTags += `#${directions.replace(/\s/g,"")} `;
    }
    if(Array.isArray(profession.split(","))){
        profession.split(",").forEach((item) => {
            item = item.replace(/\s/g, "");
            hashTags += `#${item} `;
        });
    }
    else {
        hashTags += `#${profession.replace(/\s/g,"")} `;
    }
    if(Array.isArray(countryToRelocate.split(","))){
        countryToRelocate.split(",").forEach((item) => {
            item = item.replace(/\s/g, "").split("(")[0];
            hashTags += `#relocateTo${item} `;
            });
    }
    else {
        hashTags += `#relocateTo${countryToRelocate.replace(/\s/g,"").split("(")[0]} `;
    }
    this.description = `
<b>Name:</b> ${name} ${surname}
<b>Email:</b> ${email}
<b>Location:</b> ${location}

<b>Experience:</b> ${experience} years
<b>Other experience:</b> ${otherExperience}
<b>Strengths:</b> ${strengths}
<b>Position:</b> ${position}

<b>Country to relocate:</b> ${countryToRelocate}
<b>Profession:</b> ${profession}
<b>Areas of interest:</b> ${directions}

<b>Salary:</b> ${salary}$
<b>Per hour:</b> ${perHour}$
<b>Share:</b> ${share}

<b>Method of communication:</b> ${methodOfCommunication}
<b>Links:</b> ${links}

#specialist ${hashTags}
        `;
    return this.description;
  }
  vacancyDescription(
    candidateRequirements,
    companyAdress,
    companyDescription,
    companyName,
    companyScope,
    companySpecialist,
    employment,
    jobDescription,
    responcibilities,
    salary,
    termsForCandidate,
    workFormat
  ) {
    let hashTags = "#vacancy ";
    if (Array.isArray(companyScope.split(","))) {
        companyScope.split(",").forEach((item) => {
            item = item.replace(/\s/g, "");
            hashTags += `#${item} `;
        });
    }
    else {
        hashTags += `#${companyScope.replace(/\s/g,"")} `;
    }
    if(Array.isArray(companySpecialist.split(","))){
        companySpecialist.split(",").forEach((item) => {
            item = item.replace(/\s/g, "");
            hashTags += `#${item} `;
        });
    }
    else {
        hashTags += `#${companySpecialist.replace(/\s/g,"")} `;
    }
    hashTags += `#${workFormat.replace(/\s/g,"").split("(")[0]} `;
    hashTags += `#${employment.replace(/-/g,"").replace(/\s/,"")} `;
    this.description = `
<b>Company name:</b> ${companyName}
<b>Company description:</b> ${companyDescription}
<b>Company adress:</b> ${companyAdress}

<b>Company scope:</b> ${companyScope}
<b>Specialist needed:</b> ${companySpecialist}

<b>Job description:</b> ${jobDescription}
<b>Responcibilities:</b> ${responcibilities}
<b>Terms for candidate:</b> ${termsForCandidate}
<b>Candidate requirements:</b> ${candidateRequirements}

<b>Employment:</b> ${employment}
<b>Work format:</b> ${workFormat}
<b>Salary:</b> ${salary}

${hashTags}
`;
    return this.description;
  }
  projectDescription(
    countryToRelocate,
    file,
    projectDescription,
    projectInvestmentAmountRequired,
    projectMarkets,
    projectName,
    projectRevenue,
    projectScope,
    projectSpecialist,
    projectStage,
    projectWebsite
  ) {
    let hashTags = "#project ";
    if (Array.isArray(projectScope.split(","))) {
        projectScope.split(",").forEach((item) => {
            item = item.replace(/\s/g, "");
            hashTags += `#${item} `;
        });
    }
    else {
        hashTags += `#${projectScope.replace(/\s/g,"")} `;
    }
    hashTags += `#${projectStage.replace(/\s/g,"").replace(/-/g,"")} `;
    if(Array.isArray(projectSpecialist.split(","))){
        projectSpecialist.split(",").forEach((item) => {
            item = item.replace(/\s/g, "");
            hashTags += `#${item} `;
        });
    }
    else {
        hashTags += `#${projectSpecialist.replace(/\s/g,"")} `;
    }
    if(Array.isArray(countryToRelocate.split(","))){
        countryToRelocate.split(",").forEach((item) => {
            item = item.replace(/\s/g, "").split("(")[0];
            hashTags += `#relocateTo${item} `;
            });
    }
    else {
        hashTags += `#relocateTo${countryToRelocate.replace(/\s/g,"").split("(")[0]} `;
    }

    this.description = `
<b>Project name</b>: ${projectName}
<b>Country to relocate:</b> ${countryToRelocate}
<b>Project description:</b> ${projectDescription}
<b>Project specialist:</b> ${projectSpecialist}
<b>Project stage:</b> ${projectStage}
<b>Project scope:</b> ${projectScope}
<b>Project markets:</b> ${projectMarkets}
<b>Project website:</b> ${projectWebsite}
<b>Project revenue:</b> ${projectRevenue}
<b>Project investment amount required:</b> ${projectInvestmentAmountRequired}$

${hashTags}`;
    return this.description;
  }
}

module.exports = descriptionGenerator;
