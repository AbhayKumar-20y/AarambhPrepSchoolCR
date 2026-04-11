// DATE
function getTodayDate(){
    let today = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return today.toLocaleDateString() + " (" + days[today.getDay()] + ")";
}

// ORDINAL FUNCTION (1st, 2nd, 3rd...)
function getOrdinal(n){
    let s = ["th","st","nd","rd"];
    let v = n % 100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

window.onload = function(){

    // DATE SHOW
    document.getElementById("daydate").innerText = getTodayDate();

    // CREATE PERIOD INPUTS
    for(let i=1;i<=6;i++){
        document.getElementById("inputs").innerHTML += `
        <div>
            <b>${getOrdinal(i)} Period</b><br>

            <select id="sub${i}" >
               <option>Select Subject</option>
                <option>Math</option>
                <option>Mental Math</option>
                <option>English</option>
                <option>English Grammar</option>
                <option>Hindi</option>
                <option>Hindi Grammar</option>
                <option>Computer</option>
                <option>Science</option>
                <option>E.V.S</option>
                <option>S.S.T</option>
                <option>G.K.</option>
                <option>Oral</option>
                <option>Rhymes</option>
                <option>Activity</option>
                <option>Drawing</option>
                <option>Dance</option>
                <option>Quiz</option>
                <option>Martial Art</option>
                <option>Hindi Writing Book</option>
                <option>English Writing Book</option>
                <option>Hindi Rhymes</option>
                <option>English Rhymes</option>
                <option>English Alphabet Book</option>
                <option>Hindi Book(अक्षर ज्ञान)</option>
                <option>Math Book(Numbers 1-100)</option>
                <option>Hindi Writing Book(अक्षर लेखन)</option>
            </select>

            <input id="cw${i}" placeholder="Class Work">
            <input id="hw${i}" placeholder="Home Work">
        </div>
        `;
    }
};

// GENERATE
function generate(){

    let worksheet = document.getElementById("worksheet");
    worksheet.style.display = "block";

    // CLASS + FACILITATOR
    document.getElementById("outClass").innerText =
        document.getElementById("class").value;

    document.getElementById("outFac").innerText =
        document.getElementById("facilitator").value;

    document.getElementById("outDate").innerText = getTodayDate();

    // STUDENT COUNT
    let total = +document.getElementById("totalStudents").value || 0;
    let present = +document.getElementById("presentStudents").value || 0;
    let absent = total - present;

    document.getElementById("outTotal").innerText = total;
    document.getElementById("outPresent").innerText = present;
    document.getElementById("outAbsent").innerText = absent;

    // INPUT VALUES
    let absentText = document.getElementById("absentInput").value;
    let hwText = document.getElementById("hwNotDoneInput").value;
    let extraText = document.getElementById("extraInput").value;

    // FORMAT LIST
    function formatList(text){
        if(!text) return "-";
        return text.split(",").map(x => x.trim()).filter(x => x).join(", ");
    }

    document.getElementById("outAbsentText").innerText = formatList(absentText);
    document.getElementById("outHW").innerText = formatList(hwText);
    document.getElementById("outExtra").innerText = extraText || "-";

    // ABSENT COUNT CHECK (FIXED)
    let absentCount = absentText
        ? absentText.split(",").map(x => x.trim()).filter(x => x).length
        : 0;

    if(absentCount !== absent && absent !== 0){
        alert("⚠️ Absent count mismatch! Check names.");
    }

    // TABLE DATA
    let data = "";

    for(let i=1;i<=6;i++){

        let subject = document.getElementById("sub"+i).value;
        let cw = document.getElementById("cw"+i).value;
        let hw = document.getElementById("hw"+i).value;

        data += `
        <tr>
            <td class="period-text">${getOrdinal(i)}</td>
            <td class="outputSub">${subject}</td>
            <td>${cw || "-"}</td>
            <td>${hw || "-"}</td>
        </tr>
        `;
    }

    document.getElementById("tableData").innerHTML = data;
}

// DOWNLOAD IMAGE
function downloadImage(){
    html2canvas(document.getElementById("worksheet")).then(canvas=>{
        let link = document.createElement("a");
        link.download = "Class_Report.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
