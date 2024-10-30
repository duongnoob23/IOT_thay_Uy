import './Profile.css';


function Profile(){
    return(
        <>
            <div class="profile">
                <div className="profile__top">

                </div>
                <div className="profile__bottom">
                    <div className="profile__card">
                        <div className="profile__image">
                            <img src="https://images.unsplash.com/photo-1625181067043-42eff3270801?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95fGVufDB8fDB8fHww" alt="" />
                        </div>
                        <div className="profile__info">
                            <div className="profile__name">
                                Lâm Tiến Dưỡng - B21DCCN290
                            </div>
                            <div className="profile__position">
                                Front-End Developer
                            </div>
                            <ul className="profile__social">
                                <li >
                                    <a className="profile__facebook" href="https://www.facebook.com/profile.php?id=100013254720875" target='blank'>
                                        <i class="fa-brands fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li >
                                    <a className="profile__instagram" href="https://github.com/duongnoob23/JAVA"
                                    target='blank'>
                                        <i class="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li >
                                    <a className="profile__twitter" href="https://github.com/duongnoob23/JAVA"
                                    target='blank'>
                                        <i class="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li >
                                    <a className="profile__github" href="https://github.com/duongnoob23/JAVA"
                                    target='blank'>
                                        <i class="fa-brands fa-github"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="profile__social2">
                                <div className="profile__git">
                                    <label>Github</label>
                                    <input type="text" value={`https://github.com/duongnoob23/JAVA`}>
                                        
                                    </input>
                                </div>
                                <div className="profile__api">
                                    <label >Apidoc</label>
                                    <input type="text" value={`https://www.postman.com/shoes2/workspace/duong/documentation/33791139-d7606283-f860-4bd0-b2b1-88a789243463`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
};
export default Profile;



{/* <div class="profile__picture">
    <div class="profile__title">
        Profile picture
    </div>
    <div class="profile__image">
        <div class="profile__img">
            <img src="https://images.unsplash.com/photo-1625181067043-42eff3270801?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95fGVufDB8fDB8fHww" alt="avatar"/>
        </div>
        <div className='profile__button'>
            <button className='button button__change'>Change picture</button>
        </div>
        <div className='profile__button'>
            <button className='button button__delete'>Delete picture</button>
        </div>
    </div>
</div>
<div class="profile__content">
    <div class="profile__name">
        <label for="name">Profile name</label>
        <input id="name" type="text" value="Lâm Tiến Dưỡng"/>
    </div>
    <div class="profile__class">
        <label for="class">Class</label>
        <input id="class" type="text" value="B21DCCN290"/>
    </div>
    <div class="profile__github">
        <label for="github">Github</label>
        <input type="text" id="github"/>
    </div>
    <div class="profile__apidoc">
        <label for="apidoc">API doc</label>
        <input type="text" id="apidoc"/>
    </div>
    
</div> */}