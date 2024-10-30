import React, { useEffect,useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {URL} from '../Helper/URL';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const LineChart = ({onDataUpdate}) => {


  const [dataChart,setDataChart] = useState({
    labels:[],
    datasets:[],
  })
  // console.log(onDataUpdate);
    const fetchApi = () =>{
      fetch(URL+`/datalogs/linechart`)
      .then(res => res.json())
      .then(data => {
        if(data){
          // console.log(data);
          let time = data.results.map(item => item.time) ;
          let temperature = data.results.map(item => item.temperature) ;
          let humidity = data.results.map(item => item.humidity);
          let light = data.results.map(item => item.light/10);
          let windspeed = data.results.map(item => item.windspeed);
          let count = data.count || [0];
          setDataChart({
            labels:time,
            datasets: [
              {
                label: 'Nhiệt độ (°C)',
                data: temperature,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
              },
              {
                label: 'Độ ẩm (%)',
                data: humidity,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
              },
              {
                label: 'Ánh sáng (Lux *10) ',
                data: light,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                tension: 0.4,
              },
              // {
              //   label: 'Tốc độ gió (10 Km/h) ',
              //   data: windspeed,
              //   borderColor: '#373737',
              //   backgroundColor: 'white',
              //   tension: 0.4,
              // },
            ],
          })

          const option = {
            temperature: temperature[0], // Lấy giá trị mới nhất
            humidity: humidity[0], // Lấy giá trị mới nhất
            light: light[0], // Lấy giá trị mới nhất
            windspeed: windspeed[0],
            count:count,
          };
          // console.log(option);
          onDataUpdate(option);
        }
      })
    }

   
  useEffect(() => {
    fetchApi(); // Lần gọi đầu tiên ngay khi component mount

    const interval = setInterval(() => {
      fetchApi(); // Gọi API mỗi 5 giây (5000ms)
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ Nhiệt độ, Độ ẩm, Ánh sáng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120, // Đặt giá trị tối đa cho trục y
      },
    },
  };
  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Line data={dataChart} options={options}  />
    </div>
  );
};

// onDataUpdate={handleDataUpdate}
export default LineChart;



// const data = {
//   labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00','07:00','08:00','09:00','10:00','11:00'],
//   datasets: [
//     {
//       label: 'Nhiệt độ (°C)',
//       data: [22, 21, 23, 24, 26, 27, 29,30, 16, 14, 15, 16, 32, 24],
//       borderColor: 'rgba(255, 99, 132, 1)',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       tension: 0.4,
//     },
//     {
//       label: 'Độ ẩm (%)',
//       data: [55, 60, 50, 65, 70, 75, 80,90, 70, 80, 60, 70, 65, 75],
//       borderColor: 'rgba(54, 162, 235, 1)',
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       tension: 0.4,
//     },
//     {
//       label: 'Ánh sáng (Lux *10) ',
//       data: [30, 50, 40, 60, 70, 50, 75,55, 60, 50, 65, 70, 75, 80],
//       borderColor: 'rgba(255, 206, 86, 1)',
//       backgroundColor: 'rgba(255, 206, 86, 0.2)',
//       tension: 0.4,
//     },
//   ],
//   };