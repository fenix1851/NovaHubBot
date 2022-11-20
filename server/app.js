require('dotenv').config();
const {SECRET_ENDPOINT, CRYPTO_TEST_TOKEN} = process.env;
// express helloworld app
var express = require("express");
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
var app = express();
const path = require("path");
// корс мидлвар
const {CryptoPay, Assets, PaidButtonNames} = require('@foile/crypto-pay-api');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// const bot = require(path.join(__dirname, "..","src","index.js"));
const cryptoPay = new CryptoPay(CRYPTO_TEST_TOKEN, {
  hostname: 'testnet-pay.crypt.bot',
  protocol: 'https'
});
const admins =[290561482,99577694]
app.use(upload());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../static/landing.html"));
  // res.sendFile(path.join(__dirname, "../static/specialist_form.html"));
});

app.get("/generate_invoice", function (req, res) {
  res.sendFile(path.join(__dirname, "../static/generateInvoice.html"));
});

app.post("/generate_invoice", async function (req, res) {
  console.log(req.body);
  // parce params from url
  const {amount, crypto_currency, link_to_channel, startup_name, to_id} = req.body;
  console.log(amount, crypto_currency, link_to_channel, startup_name, to_id);
  // res.send("ok");
  if(!amount || !crypto_currency || !link_to_channel || !startup_name || !to_id){
    res.send("error", 400);
    return;
  }
  else{
    // generate invoice
      const invoice = await cryptoPay.createInvoice(crypto_currency, amount,{
        description: `Donate ${amount} ${crypto_currency} to ${startup_name}`,
        paid_btn_name: PaidButtonNames.OPEN_CHANNEL,
        hidden_message: `Congratulations! You have donated ${amount} ${crypto_currency} to ${startup_name}!`,
        paid_btn_url: link_to_channel,
        payload: `{"chat_id": "${to_id}"}`
      })
      // return await res.send('dasd');
      res.set('Content-Type', 'application/json');
      let url = invoice.pay_url
      return res.json({url});
  }
  // generate invoice
});
app.get("/donate", function (req, res) {
  res.sendFile(path.join(__dirname, "../static/donate.html"));
});
// роут специалиста
// роут под список профессий специалиста
app.get("/specialist/professions", function (req, res) {
  array_of_professions = [
    "Head of Product",
    "Chief Product Officer",
    " Product Manager",
    " Project Manager",
    " Product Owner",
    " CTO",
    " CIO",
    " Tech Lead",
    " Team Lead Architect",
    " Head of PMO",
    " Chief Architect",
    " Project Lead",
    " Business Owner",
    "Senior iOS developer",
    "Senior Android developer",
    "Senior web developer",
    " iOS developer",
    "Senior web and iOS developer",
    "Web developer",
    "Smart web and Android developer",
    "Backend developer",
    "Senior frontend developer",
    "Senior backend developer",
    " Full stack developer",
    "Senior QA engineer",
    "Senior QC engineer",
    " QA engineer",
    " QC engineer",
    " Mentor",
    " Advisor",
    " Graphic Designer",
    " Mobile Designer",
    " Product Designer",
    "UI/UX Designer",
    " Head of Operation HR",
    " IT Recruiter",
    " Career Adviser",
    " MarHR",
    " HR Director",
    " Head Hunter",
    " PR specialist",
    " SMM manager",
    " Marketing specialist",
  ];
  // отправляем список профессий в формате json
  res.json(array_of_professions);
});
// роут под список направлений специалиста
app.get("/specialist/directions", function (req, res) {
  array_of_directions = [
    "GovTech",
    "RegTech",
    "AgTech",
    "EdTech",
    "HealthTech",
    "FoodTech",
    "RetailTech",
    "InsurTech",
    "PropTech",
    "LegalTech",
    "AdTech & MarTech",
    "Wealthtech",
    "Deeptech",
    "Saas",
    "CryptoTech",
    "AI",
    "BioTech",
    "CleanTech",
    "MedTech",
    "Cleantech",
    "Greentech",
    "Fintech",
  ];
  // отправляем список направлений в формате json
  res.json(array_of_directions);
});

// роут под список стран для релокации
app.get("/specialist/countries", function (req, res) {
  array_of_countries = [
    "Bulgaria (Startup Visa)",
    "Canada (Start-Up Visa)",
    "Chile (Visa Tech Start-Up Chile)",
    "Denmark (Startup Denmark)",
    "Estonia (Estonian Startup Visa)",
    "Finland (Finnish Startup Permit)",
    "France (French Tech Visa)",
    "Gibraltar (Start-up Visa)",
    "Ireland (Start-up Entrepreneur Programme)",
    "Italy (Italia Startup Visa)",
    "Japan (Startup Visa)",
    'Kazakhstan (Startup Visa Astana Hub)',
    "Korea South (Startup Prep. Visa)",
    "Latvia (Startup Visa)",
    "Lithuania (Startup Visa Lithuania)",
    "Netherlands (Start-up Residence Permit)",
    "Poland (Poland Business Harbour)",
    "Portugal (StartUP Visa Portugal)",
    "Singapore (Startup SG Talent EntrePass0",
    "Spain (Startup Visa)",
    "Thailand (Smart S Startup)",
    "UK (Start-up Visa)",
    "USA (International Entrepreneur Parole)",
  ];
  // отправляем список стран в формате json
  res.json(array_of_countries);
});

// роуты проекта
// роут под список стадий проекта
app.get("/project/stages", function (req, res) {
  array_of_stages = [
    "Pre-seed",
    "Seed",
    "Round A",
    "Round B",
    "Round C",
    "Round D",
  ];
  // отправляем список стадий в формате json
  res.json(array_of_stages);
});

// роут под список направлений проекта
app.get("/project/directions", function (req, res) {
  array_of_directions = [
    "FinTech",
    "GovTech",
    "RegTech",
    "AgTech",
    "EdTech",
    "HealthTech",
    "FoodTech",
    "RetailTech",
    "InsurTech",
    "PropTech",
    "LegalTech",
    "AdTech & MarTech",
    "Wealthtech",
    "Deeptech",
    "Saas",
    "CryptoTech",
    "AI",
    "BioTech",
    "CleanTech",
    "MedTech",
    "Cleantech",
    "Greentech",
    "Crypto",
  ];
  // отправляем список направлений в формате json
  res.json(array_of_directions);
});

// роут под список специалистов проекта
app.get("/project/specialists", function (req, res) {
  array_of_specialists = [
    "Head of Product",
    "Chief Product Officer",
    " Product Manager",
    " Project Manager",
    " Product Owner",
    " CTO",
    " CIO",
    " Tech Lead",
    " Team Lead Architect",
    " Head of PMO",
    " Chief Architect",
    " Project Lead",
    " Business Owner",
    "Senior iOS developer",
    "Senior Android developer",
    "Senior web developer",
    " iOS developer",
    "Senior web and iOS developer",
    "Web developer",
    "Smart web and Android developer",
    "Backend developer",
    "Senior frontend developer",
    "Senior backend developer",
    " Full stack developer",
    "Senior QA engineer",
    "Senior QC engineer",
    " QA engineer",
    " QC engineer",
    " Mentor",
    " Advisor",
    " Graphic Designer",
    " Mobile Designer",
    " Product Designer",
    "UI/UX Designer",
    " Head of Operation HR",
    " IT Recruiter",
    " Career Adviser",
    " MarHR",
    " HR Director",
    " Head Hunter",
    " PR specialist",
    " SMM manager",
    " Marketing specialist",
  ];
  // отправляем список специалистов в формате json
  res.json(array_of_specialists);
});

// роут под список стран для релокации проекта
app.get("/project/countries", function (req, res) {
  array_of_countries = [
    "Bulgaria (Startup Visa)",
    "Canada (Start-Up Visa)",
    "Chile (Visa Tech Start-Up Chile)",
    "Denmark (Startup Denmark)",
    "Estonia (Estonian Startup Visa)",
    "Finland (Finnish Startup Permit)",
    "France (French Tech Visa)",
    "Gibraltar (Start-up Visa)",
    "Ireland (Start-up Entrepreneur Programme)",
    "Italy (Italia Startup Visa)",
    "Japan (Startup Visa)",
    'Kazakhstan (Startup Visa Astana Hub)',
    "Korea South (Startup Prep. Visa)",
    "Latvia (Startup Visa)",
    "Lithuania (Startup Visa Lithuania)",
    "Netherlands (Start-up Residence Permit)",
    "Poland (Poland Business Harbour)",
    "Portugal (StartUP Visa Portugal)",
    "Singapore (Startup SG Talent EntrePass0",
    "Spain (Startup Visa)",
    "Thailand (Smart S Startup)",
    "UK (Start-up Visa)",
    "USA (International Entrepreneur Parole)",
  ];
  // отправляем список стран в формате json
  res.json(array_of_countries);
});

// // роуты для формы работы
//роут под направления компании
app.get("/work/directions", function (req, res) {
  array_of_directions = [
    "FinTech",
    "GovTech",
    "RegTech",
    "AgTech",
    "EdTech",
    "HealthTech",
    "FoodTech",
    "RetailTech",
    "InsurTech",
    "PropTech",
    "LegalTech",
    "AdTech & MarTech",
    "Wealthtech",
    "Deeptech",
    "Saas",
    "CryptoTech",
    "AI",
    "BioTech",
    "CleanTech",
    "MedTech",
    "Cleantech",
    "Greentech",
    "Crypto",
  ];
  // отправляем список направлений в формате json
  res.json(array_of_directions);
});
//роут под список специалистов
app.get("/work/specialists", function (req, res) {
  array_of_specialists = [
    "Head of Product",
    "Chief Product Officer",
    " Product Manager",
    " Project Manager",
    " Product Owner",
    " CTO",
    " CIO",
    " Tech Lead",
    " Team Lead Architect",
    " Head of PMO",
    " Chief Architect",
    " Project Lead",
    " Business Owner",
    "Senior iOS developer",
    "Senior Android developer",
    "Senior web developer",
    " iOS developer",
    "Senior web and iOS developer",
    "Web developer",
    "Smart web and Android developer",
    "Backend developer",
    "Senior frontend developer",
    "Senior backend developer",
    " Full stack developer",
    "Senior QA engineer",
    "Senior QC engineer",
    " QA engineer",
    " QC engineer",
    " Mentor",
    " Advisor",
    " Graphic Designer",
    " Mobile Designer",
    " Product Designer",
    "UI/UX Designer",
    " Head of Operation HR",
    " IT Recruiter",
    " Career Adviser",
    " MarHR",
    " HR Director",
    " Head Hunter",
    " PR specialist",
    " SMM manager",
    " Marketing specialist",
  ];
  // отправляем список специалистов в формате json
  res.json(array_of_specialists);
});

// роут под список стран для релокации проекта
app.get("/work/countries", function (req, res) {
  array_of_countries = [
    "Bulgaria (Startup Visa)",
    "Canada (Start-Up Visa)",
    "Chile (Visa Tech Start-Up Chile)",
    "Denmark (Startup Denmark)",
    "Estonia (Estonian Startup Visa)",
    "Finland (Finnish Startup Permit)",
    "France (French Tech Visa)",
    "Gibraltar (Start-up Visa)",
    "Ireland (Start-up Entrepreneur Programme)",
    "Italy (Italia Startup Visa)",
    "Japan (Startup Visa)",
    'Kazakhstan (Startup Visa Astana Hub)',
    "Korea South (Startup Prep. Visa)",
    "Latvia (Startup Visa)",
    "Lithuania (Startup Visa Lithuania)",
    "Netherlands (Start-up Residence Permit)",
    "Poland (Poland Business Harbour)",
    "Portugal (StartUP Visa Portugal)",
    "Singapore (Startup SG Talent EntrePass0",
    "Spain (Startup Visa)",
    "Thailand (Smart S Startup)",
    "UK (Start-up Visa)",
    "USA (International Entrepreneur Parole)",
  ];
  // отправляем список стран в формате json
  res.json(array_of_countries);
});

// роут под формат работы офис/удаленка
app.get("/work/formats", function (req, res) {
  array_of_formats = ["Office", "Remote", "Hybrid (Office+Remotely)"];
  // отправляем список форматов работы в формате json
  res.json(array_of_formats);
});

// роут под employment type
app.get("/work/employment_types", function (req, res) {
  array_of_employment_types = ["Full-time", "Part-time", "Project employment"];
  // отправляем список employment types в формате json
  res.json(array_of_employment_types);
});

// роуты под формы
// роут под статическую форму специалиста
app.get("/specialist", function (req, res) {
  // html файл хранится в ../static/specialist_form.html
  res.sendFile(path.join(__dirname, "../static/specialist_form.html"));
});

// роут под статическую форму проекта
app.get("/project", function (req, res) {
  // html файл хранится в ../static/project_form.html
  res.sendFile(path.join(__dirname, "../static/project_form.html"));
});

// роут под статическую форму job
app.get("/job", function (req, res) {
  // html файл хранится в ../static/job_form.html
  res.sendFile(path.join(__dirname, "../static/job_form.html"));
});

app.get("/test", function (req, res) {
  // html файл хранится в ../static/job_form.html
  res.sendFile(path.join(__dirname, "../static/test_form.html"));
});

// file upload
app.post("/form", async (req, res) => {
  console.log("req.body", req.body);
  let formFields = {};
      for (let key in req.body) {
        formFields[key] = req.body[key];
      }
      if(formFields.AcceptDonations === 'on') {
        formFields['AcceptDonations'] = true;
      }
  try {
    if(req.files !== null) {
      let file = req.files.file;
      console.log("files", req.files);
      console.log("file", file);
      let filename = file.name;
      let fileExtension = filename.split(".").pop();
      // iterate over form fields
      if (fileExtension != "pdf") {
        return res.send({
          status: 401,
          message: "Invalid file type",
        });
      }
      // generate random name for file to avoid duplicate file name
      let randomName = Math.floor(Math.random() * 1000000000000);
      let newFileName = randomName + "." + fileExtension;
      // check is file already exists
      
      await file.mv(__dirname+"/uploads/" + newFileName, function (err) {
        if (err) {
          console.log(err)
        } else {
          formFields["file"] = newFileName;
          return res.send({
            status: 200,
            message: "File is uploaded",
            data: formFields
          });
      }});}
      else {
        return res.send({
          status: 200,
          message: "File is not uploaded",
          data: formFields
        });
      }

      
    
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// invoices
app.post(SECRET_ENDPOINT, async (req, res) => {
  // console.log(req)
  console.log("req.body", req.body);
  const {body} = req
  const {asset, fee, amount, status, payload, description, invoice_id} = body.payload;
  const chat_id = JSON.parse(payload).chat_id;
  if(status != "paid") {
    return res.send({
      status: 200,
      message: "Invoice is not paid",
    });
  }
  // generate random string
  let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  // create transfer 
  await cryptoPay.transfer(chat_id, asset, (amount-fee)*0.8, randomString, { comment: 'donate' }).catch(async (err) => {
    console.log(err)
    let errMessage = err.message;
    if (errMessage.includes("USER_NOT_FOUND")) {
      // cryptoPay.transfer()
      console.log("user not found")
      for (let admin of admins){
        let message = await bot.telegram.sendMessage(admin, `INVOICE ID : ${invoice_id}
Startup ${chat_id} not found, 
transfer failed, transfer 
amount: ${(amount-fee)*0.8} ${asset}, 
transfer description: ${description}`)
      }
    }
  }).finally(async () => {
    return res.send('OK')
  })
});



// роуты под фаилы
// отправляем библиотеку muliselect для формы специалиста
app.use(
  "/libraries",
  express.static(path.join(__dirname, "../static/libraries"))
);

// стили
app.use("/styles", express.static(path.join(__dirname, "../static/styles")));

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// 1091877-cj82799.tmweb.ru
