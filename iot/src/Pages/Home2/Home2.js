

import LineChart2 from '../../Components/LineChart2/LineChart2';
import './Home2.css'
import { useState,useEffect } from "react";
import mqtt from 'mqtt'; // Đảm bảo đã import mqtt
import { URL } from '../../Components/Helper/URL';

function Home2(){    


    // const light1 =document.querySelector("device__light");
    const [turnOn, setTurnOn] = useState(JSON.parse(localStorage.getItem('turnOn')) ? JSON.parse(localStorage.getItem('turnOn')) : false );
    const [turnOn1, setTurnOn1] = useState(JSON.parse(localStorage.getItem('turnOn1')) ? JSON.parse(localStorage.getItem('turnOn1')) : false );
    const [turnOn2, setTurnOn2] = useState(JSON.parse(localStorage.getItem('turnOn2')) ? JSON.parse(localStorage.getItem('turnOn2')) : false );
    const [turnOn3, setTurnOn3] = useState(JSON.parse(localStorage.getItem('turnOn3')) ? JSON.parse(localStorage.getItem('turnOn3')) : false );
    // const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(false); // Thêm state loading
    const [dataHome,setDataHome] = useState({
        temperature:"",
        humidity:"",
        light:"",
        wind:"",
        warnning:"0",
        count:0,
    });
    
    useEffect(() => {
        localStorage.setItem('turnOn', JSON.stringify(turnOn));
        localStorage.setItem('turnOn1', JSON.stringify(turnOn1));
        localStorage.setItem('turnOn2', JSON.stringify(turnOn2));
        localStorage.setItem('turnOn3', JSON.stringify(turnOn3));
    }, [turnOn2,turnOn1,turnOn,turnOn3]);

    const fetchAction = () =>{
        fetch(`${URL}/actionhistory/check`)
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data);
            }
        })
    }
    
    const fetchPostApi = (numberTurnOn,device,turn) =>{
        const option = {
            stt: "",
            device: `${device}`,
            action: `${numberTurnOn === true ? "Off" : "On"}`,
            turn:`${turn}`,
            time: (() => {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            })(),
        };

        // console.log(option);
         fetch(URL+`/actionhistory/put`,{
             method:"POST",
             headers:{
                 Accept:"application/json",
                 "Content-type":"application/json"
             },
             body:JSON.stringify(option),
         })
         .then( res => res.json())
         .then(data => {
             if(data){
                console.log(data);
             }
         })
    }

    const handleTurnOnWind = () => {
        // fetchPostApi(turnOn3, "wind", "turn4");
        // console.log("da click");
        // let interval;
        // interval = setInterval(() => {
        //     fetch(`${URL}/actionhistory/check`)
        //     .then(res => res.json())
        //     .then(data => {
        //         if(data && data.type === "wind"){
        //             console.log(data);
        //             clearInterval(interval);
        //             setTurnOn(turnOn3 => !turnOn3);
        //             console.log("da bat");
        //         }
        //     })
        // },1000);

        fetchPostApi(turnOn3, "wind", "turn4");

        let interval1;
        interval1 = setInterval(() => {
            fetch(`${URL}/actionhistory/check`)
            .then(res => res.json())
            .then(data => {
                if(data && data.type === "wind"){
                    console.log(data);
                    clearInterval(interval1);
                    setTurnOn3(turnOn3 => !turnOn3);

                }
            })
        },1000);
    }

    const handleDataUpdate = (data) =>{
        setDataHome({
            ...dataHome,
            temperature:data.temperature,
            humidity:data.humidity,
            light:parseInt(data.light),
            windspeed:data.windspeed,
            warnning:`${data.windspeed > 50 ? "1" : "0"}`,
            count:data.count,
         });
        //  console.log(dataHome);

    }
   
    

    return(
        //
        <>
        <div class="main">
            {/* <div className={`warnning ${dataHome.warnning === "1" ? "show" : ""}`}>
                <i class="fa-solid fa-triangle-exclamation warnning-icon"></i>
                <span className='warnning-text'>Tốc độ gió rất lớn </span>
                <div className='warnning-count'>Số lần vượt quá 60Km/h {dataHome.count} </div>
            </div> */}
            <div className="section">
                <div className="section-one">
                    <div className="meter">
                        <ul className="meter-list">


                            <li className="meter-item" style={{ backgroundImage:`linear-gradient(to bottom, black , white )` }}>
                                <div className="meter-digit" >{dataHome.windspeed}km/h</div>
                                <i className="fa-solid fa-wind"></i>
                                <div className="windspeed">Winspeed</div>
                            </li>


                            <li className={`electric-item ${dataHome.windspeed>=70 ? "box12" : ""}`}>
                                <div className="electric-box">
                                    <input checked={turnOn3} type="checkbox" className="electric-input" id="electric-input1"></input>
                                   <label for="electric-input1" className="electric-label" onClick ={handleTurnOnWind}></label>
                               </div>
                                <div className="on-off">
                                    {turnOn3 ? "On" : "Off"}
                                </div>
                                {/* <i class="fa-solid fa-wind"></i> */}
                                <i className={turnOn3 ? "fa-solid fa-wind electric-light show" : "fa-solid fa-wind electric-light"}></i>
                                <div className="light">Windspeed</div>
                                <div className="">SỐ LẦN TỐC ĐỘ GIÓ VƯỢT QUÁ 70km/h {dataHome.count}</div>
                            </li>


                        </ul>
                    </div>
                    <div className="chart">
                        <div style={{ padding: '0px',
                                        marginBottom:"20px" }}>
                            <LineChart2 onDataUpdate={handleDataUpdate}/>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        </>
    )
};
export default Home2;



{/* <div className="openning">
    <div className="openning__box"></div>
    <div className="openning__title">Hello, DuongNo0b!</div>
    <div className="openning__desc">
        Welcome Home! The air quality is good & fresh
        <br/>
        you can go out today
    </div>
    <div className="temperature">
        <i className="fa-solid fa-temperature-low"></i>
        <span>+25C Outdoor temperature</span>
    </div>
    <div className="weather">
        <i className="fa-solid fa-cloud"></i>
        <span>Fuzzy cloudy weather</span>
    </div>
</div> */}

{/* <div class="header"> */}
                {/* <div class="search">
                    <label for="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input type="text" id="search" class="search__input" placeholder="Search">
                </div> */}
                {/* <div class="users">
                    <ul>
                        <li>
                            <div class="setting">
                                <i class="fa-solid fa-gears"></i>
                            </div>
                        </li>
                        <li>
                            <div class="notice">
                                <i class="fa-regular fa-bell"></i>
                            </div>
                        </li>
                        <li>
                            <img class="image" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww" alt="">
                            <span>DuongNo0b</span>
                            <i class="fa-solid fa-caret-down"></i>
                        </li>
                        
                    </ul>
                </div> */}
            {/* </div> */}

// chưa hiểu tại sao khối code này ko chạy
    // useEffect(()=>{
    //     console.log('bug');
    //     if(turnOn == true){
    //         handleTurnOnLight();
    //     };
    //     if(turnOn1 == true){
    //         handleTurnOnTemperature();
    //     };
    //     if(turnOn2 == true){
    //         handleTurnOnAir();
    //     };
    // },[])