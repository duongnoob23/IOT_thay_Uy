import './Action.css';
import {useEffect, useRef, useState} from 'react';


function Action(){
   

    
     const dataLog = [
        { id: 1,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:00" },
        { id: 2,device:"light" ,action: "Off", time: "2024-08-25 14:05" },
        { id: 3,device:"temperature" ,action: "Off", time: "2024-08-25 14:10" },
        { id: 4,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:15" },
        { id: 5,device:"light" ,action: "Off", time: "2024-08-25 14:20" },
        { id: 6,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:25" },
        { id: 7,device:"temperature" ,action: "On", time: "2024-08-25 14:30" },
        { id: 8,device:"light" ,action: "Off", time: "2024-08-25 14:35" },
        { id: 9,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:40" },
        { id: 10,device:"light" ,action: "Off", time: "2024-08-25 14:45" },
        { id: 11,device:"temperature" ,action: "On", time: "2024-08-25 14:00" },
        { id: 12,device:"air_conditioner" ,action: "Off", time: "2024-08-25 14:05" },
        { id: 13,device:"air_conditioner" ,action: "Off", time: "2024-08-25 14:10" },
        { id: 14,device:"light" ,action: "On", time: "2024-08-25 14:15" },
        { id: 15,device:"temperature" ,action: "Off", time: "2024-08-25 14:20" },
        { id: 16,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:25" },
        { id: 17,device:"light" ,action: "On", time: "2024-08-25 14:30" },
        { id: 18,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:35" },
        { id: 19,device:"temperature" ,action: "On", time: "2024-08-25 14:40" },
        { id: 20,device:"light" ,action: "On", time: "2024-08-25 14:45" },
        { id: 21,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:00" },
        { id: 22,device:"light" ,action: "Off", time: "2024-08-25 14:05" },
        { id: 23,device:"light" ,action: "Off", time: "2024-08-25 14:10" },
        { id: 24,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:15" },
        { id: 25,device:"air_conditioner" ,action: "Off", time: "2024-08-25 14:20" },
        { id: 26,device:"light" ,action: "On", time: "2024-08-25 14:25" },
        { id: 27,device:"temperature" ,action: "On", time: "2024-08-25 14:30" },
        { id: 28,device:"light" ,action: "On", time: "2024-08-25 14:35" },
        { id: 29,device:"air_conditioner" ,action: "Off", time: "2024-08-25 14:40" },
        { id: 30,device:"air_conditioner" ,action: "On", time: "2024-08-25 14:45" },
        { id: 31,device:"air_conditioner" ,action: "Off", time: "2024-08-25 14:40" },
        { id: 32,device:"temperature" ,action: "On", time: "2024-08-25 14:45" },
    ];
    
    const [selectKey,setSelectKey] = useState('');      // giá trị người dùng chọn 
    const [selectInput,setSelectInput] = useState("");    // giá trị của ô input
    const [selectRow,setSelectRow] = useState(10);
    const [data,setData] = useState([...dataLog]);      // data in ra trong bảng
    const inputRef = useRef(null);                      // input nhập giá trị
    
    const [params,setParams] = useState({
        searchKey:"",
        searchValue:"",
        page:1,
        limit:10,
        
    })
    const [api,setApi] = useState(`http://localhost:3001/action?searchKey=${params.searchKey}&searchValue=${params.searchValue}&page=${params.page}&limit=${params.limit}`);


    const handleChangeSelectKey = (e) =>{
        console.log(e.target.value);
        setSelectKey(e.target.value); // lưu lựa chọn đơn vị 
    }
    const handleChangeSelectInput = (e) =>{
        console.log(e.target.value);
        setSelectInput(e.target.value) // lưu giá trị ô input search vào 
    }
    const handleChangeSelectRow = (e)=>{
        console.log(e.target.value);
        setSelectRow(e.target.value);
    }
    
    const handleClickSearch =(e) =>{
        // console.log("click");
        if(!selectKey || !selectInput){
            setParams({
                ...params,
                searchKey:"",
                searchValue:"",
                page:1,
                limit:10,
            });
        }
        if(selectKey !== ""){
            setParams({
                ...params,
                searchKey:selectKey,
                searchValue:selectInput,
                page:1,
            });
            // inputRef.current.value="";
            // inputRef.current.focus();
            setSelectInput("");
            setSelectKey("");
        }
    }

      
    useEffect(() => {
        if ( (params.searchKey && params.searchValue) || params.limit || params.page  ) {
            console.log(api);
            fetch(api)
            .then(res => res.json())
            .then(data => {
                if(data){
                    setData(data.results);
                    setTotalPage(data.totalPages);
                }
            });
        }
    },[api]);
    

    useEffect(()=>{
        setApi(`http://localhost:3001/function?searchKey=${params.searchKey}&searchValue=${params.searchValue}&page=${params.page}&limit=${params.limit}`);
    },[params]);

    return(
        <>
            
            <div className='action'>
                <h2 className="action-title" >
                    Action History
                </h2>
                <div className="option">
                    <div className="search">
                        <input type="text" placeholder="search" className="search__input" onChange={handleChangeSelectInput}></input>
                        <input type="text" onChange={handleChangeSelectInput} />
                        <i class="fa-solid fa-magnifying-glass search__icon" onClick={handleClickSearch}></i>
                    </div>
                    <div className="select">
                        <select value ={selectKey} className="select__list" onChange={handleChangeSelectKey} >
                            <option  className="select__option1" value={'device'}>Device</option>
                            <option  className="select__option2" value={'action'}>Action</option>
                            <option className="select__option3" value="" hidden>--Hãy chọn giá trị--</option>
                        </select>
                    </div>
                    <div className="select2">
                        <select value ={selectRow} className="select__list" onChange={handleChangeSelectRow} >
                            <option  className="select2__option1" value={10}>10 hàng</option>
                            <option  className="select2__option2" value={20}>20 hàng</option>
                            <option className="select2__option3" value={30}>30 hàng</option>
                            <option className="select2__option4" value="" hidden>--Hãy chọn giá trị--</option>
                        </select>
                    </div>
                </div>

                <div className='table__container'>
                    <table className="table">
                        <thead className = "table__head">
                            <tr className="table-row__head">
                                <th classname="table__id table-row__item">ID</th>
                                <th className="table__device table-row__item" >Device</th>
                                <th className="table__action table-row__item" >Action</th>
                                <th className="table__time table-row__item" >Thời gian</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {data.map((item) => (
                                <tr className="table-row__body" key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.device}</td>
                                    <td>{item.action}</td>
                                    <td>{item.time}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='pagination'>
                    <ul className='pagi__list'>
                        <li className='pagi__pre pagi__item' onClick={handlePrePage}>
                        {totalPage === 1 ? "" : 
                            <>
                                { currentPage === 1 ? "" : 
                                <>
                                <i class="fa-solid fa-backward"></i>
                                </>
                                }
                            </>
                            }
                        </li>
                        <li className='pagi__cur pagi__item'>{currentPage}</li>
                        <li className='pagi__next pagi__item' onClick={handleNextPage}>
                            {totalPage === 1 ? "" : 
                            <>
                                { currentPage === totalPage ? "" : 
                                <>
                                <i class="fa-solid fa-forward"></i>
                                </>
                                }
                            </>
                            }
                            
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};
export default Action;

// 1 phân trang
// 2 số lượng column trên trang
// fix lỗi 20 hàng mà chỉ có 1 trang dữ liệu
// 3 sort từng ô fix khi click vao tim kiem thi tro ve 30 hang, fix khi sort lan 3 tro ve 30 hang
// khi mình sort lần đầu setData(sorted) sẽ đúng vì đã đc sort và phân trang,
// còn khi chuyển trang -> pageNumber thay đổi -> useEffect thay đổi dẫn tới
// setData([...datalogs]) mà datalogs chưa đc sắp xếp
// giải pháp: tạo 1 mảng để lưu sorted luu y ko can su dung status = true
// mỗi khi chuyển trang thì dùng data của mảng đó 

// 4 search time

{/* <div className='table__container'>
    <table className='table'>
        <thead className='table__head'>
            <tr className='table__head-item'>
                <th className=''>ID</th>
                <th className=''>Nhiệt độ (C)</th>
                <th className=''>Độ Ẩm (%)</th>
                <th className=''>Ánh sáng (lux)</th>
                <th className=''>Thời gian</th>
            </tr>
        </thead>
        <tbody className='table__body'>
            {data.map((item) =>(
                <tr key={item.id} className='table__body-item'>
                    <td className=''>{item.id}</td>
                    <td className=''>{item.temperature}</td>
                    <td className=''>{item.humidity}</td>
                    <td className=''>{item.light}</td>
                    <td className=''>{item.time}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div> */}