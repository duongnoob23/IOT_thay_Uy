import './Action.css';
import {useEffect, useRef, useState} from 'react';
import { URL } from '../../Components/Helper/URL';

function Action(){
   
    
    const [selectKey,setSelectKey] = useState('');      // giá trị người dùng chọn 
    const [selectInput,setSelectInput] = useState("");    // giá trị của ô input
    const [selectRow,setSelectRow] = useState(10);
    const [data,setData] = useState([]);      // data in ra trong bảng
    const inputRef1 = useRef(null);                    // input nhập giá trị
    const inputRef2 = useRef(null);                    // input nhập giá trị
    const inputRef3 = useRef(null);                    // input nhập giá trị
    const [totalPage,setTotalPage] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [params,setParams] = useState({
        searchKey:"",
        searchValue:"",
        page:1,
        limit:10,
        
    })
    const [api,setApi] = useState(`${URL}/actionhistory?searchKey=${params.searchKey}&searchValue=${params.searchValue}&page=${params.page}&limit=${params.limit}`);
    // console.log(URL);

    const fetchApi = (http) =>{
        fetch(http)
        .then(res => res.json())
        .then(data => {
            if(data){
                // console.log(data);
                setData(data.results);
                setTotalPage(data.totalPages);
            }
        });
    } 
    // console.log(totalPage);
    useEffect(()=>{
        fetchApi(api);
        
    },[]);

    const handleChangeSelectKey = (e) =>{
        console.log(e.target.value);
        setSelectKey(e.target.value); // lưu lựa chọn đơn vị 
    }
    const handleChangeSelectInput = (e) =>{
        console.log(e.target.value);
        setSelectInput(e.target.value) // lưu giá trị ô input search vào 
    }
    const handleChangeSelectRow = (e)=>{
        setSelectRow(e.target.value);
        setParams({
            ...params,
            limit:e.target.value,
        });
    }

    const handlePrePage = (e) =>{
        setParams({
            ...params,
            page:params.page-1,
            
        });
    }

    const handleNextPage = (e) =>{
        
        setParams({
            ...params,
            page:params.page+1,
            
        });
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
                startTime:"",
                endTime:"",
            });
        }
        if(selectKey !=="" && selectKey!=""){
            setParams({
                ...params,
                searchKey:selectKey,
                searchValue:selectInput,
                page:1,
                limit:10,
            });
            inputRef3.current.value="";
            inputRef3.current.focus();
            setSelectInput("");
            setSelectKey("");
        }
        // if(selectKey==="time"){
        //     setParams({
        //         ...params,
        //         page:1,
        //         limit:10,
        //         startTime:start,
        //         endTime:end,
        //     });
        //     inputRef1.current.value="";
        //     inputRef2.current.value="";
        //     setSelectInput("");
        //     setSelectKey("");
        // }
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
        setApi(`${URL}/actionhistory?searchKey=${params.searchKey}&searchValue=${params.searchValue}&page=${params.page}&limit=${params.limit}`);
    },[params]);

    return(
        <>
            
            <div className='action'>
                <h2 className="action-title" >
                    Action History
                </h2>
                <div className="option">
                    <div className="search">
                        <input ref={inputRef3} type="text" placeholder="search" className="search__input" onChange={handleChangeSelectInput}></input>
                        <i class="fa-solid fa-magnifying-glass search__icon" onClick={handleClickSearch} ></i>

                    </div>
                    <div className="select">
                        <select value ={selectKey} className="select__list" onChange={handleChangeSelectKey} >
                            <option  className="select__option1" value={'device'}>Device</option>
                            <option  className="select__option2" value={'action'}>Action</option>
                            <option  className="select__option3" value={'time'}>Time</option>
                            <option className="select__option4" value="" hidden>--Hãy chọn giá trị--</option>
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
                            {data && data.map((item) => (
                                <tr className="table-row__body" key={item._id}>
                                    <td>{item.stt}</td>
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
                                { params.page === 1 ? "" : 
                                <>
                                <i class="fa-solid fa-backward"></i>
                                </>
                                }
                            </>
                            }
                        </li>
                        <li className='pagi__cur pagi__item'>{params.page}</li>
                        <li className='pagi__next pagi__item' onClick={handleNextPage}>
                            {totalPage === 1 ? "" : 
                            <>
                                { params.page === totalPage ? "" : 
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