const options = {

    chart: {
        height: 350,
        type: "line",
        stacked: false,
        zoom: {
            type: 'xy'
        }
    },
    dataLabels: {
        enabled: false
    },

    colors: ["#FF1654", "#247BA0"],
    series: [
        {
            name: "Sinus",
            data: []
        },
        {
            name: "Cosinus",
            data: []
        }
    ],
    stroke: {
        width: [0, 0]
    },
    plotOptions: {
        bar: {
            columnWidth: "20%"
        }
    },
    xaxis: {
        tickAmount: 10,

    },
    yaxis: [
        {
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
                color: "#FF1654"
            },
            labels: {
                formatter(value) {
                    return value.toFixed(1);
                },
                style: {
                    colors: "#FF1654"
                }
            },
            title: {
                style: {
                    color: "#FF1654"
                }
            }
        }


    ],

    tooltip: {
        shared: false,
        intersect: true,
        x: {
            show: false
        }
    },
    legend: {
        horizontalAlign: "left",
        offsetX: 40
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


const newCosData = [];
const newSinData = [];

const evtSource = new EventSource("https://iolab.sk/evaluation/sse/sse.php")
const sseHandler = (event) => {
    const data = JSON.parse(event.data);

    newSinData.push(data.y1 * document.getElementById("myinput").value);
    newCosData.push(data.y2 * document.getElementById("myinput").value);

    //console.log(document.querySelector('my-input').dostanHodnotu())
    //changeOptions();


    chart.updateSeries([
        {
            name: "Cosinus",
            data: newCosData
        },
        {
            name: "Sinus",
            data: newSinData
        }])
}


evtSource.addEventListener("message", sseHandler)

const stop = () => {
    evtSource.removeEventListener("message", sseHandler, false);
}
document.querySelector("#koniec").addEventListener("click", stop);



const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.24}px))`;
}


const fchangeNumber = () => {
    document.getElementById("cislo").value = document.getElementById("myinput").value;


}

$('#cislo').on('change', function () {
    let minVal = parseInt($('#cislo').val());
    $('#myinput').val(minVal)
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".range");
        const bubble = wrap.querySelector(".bubble");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });
});
 const changeOptions=()=>{
     if (document.getElementById("sinusCheck").checked && document.getElementById("cosinusCheck").checked) {
         chart.updateOptions({
             stroke: {
                 width: [4, 4]
             }
         })
     }
     if(!document.getElementById("sinusCheck").checked && !document.getElementById("cosinusCheck").checked) {
         chart.updateOptions({
             stroke: {
                 width: [0, 0]
             }
         })
     }
     if (document.getElementById("sinusCheck").checked && !document.getElementById("cosinusCheck").checked) {
         chart.updateOptions({
             stroke: {
                 width: [0, 4]
             }
         })
     }
     else if (document.getElementById("cosinusCheck").checked && !document.getElementById("sinusCheck").checked) {
         chart.updateOptions({
             stroke: {
                 width: [4, 0]
             }
         })
     }
 }
document.getElementById("cislo").hidden=true;
document.getElementById("myinput").hidden=true;
document.getElementById("slidepoint").hidden=true;

const checkedFunction=()=>{
    if(document.getElementById("vstup").checked){
        document.getElementById("cislo").hidden=false;
        document.getElementById("myinput").hidden=true;
        document.getElementById("slidepoint").hidden=true;
    }
    else if(document.getElementById("slider").value){
        document.getElementById("myinput").hidden=false;
        document.getElementById("slidepoint").hidden=false;
        document.getElementById("cislo").hidden=true;
    }

}



