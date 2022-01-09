import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faGripVertical } from '@fortawesome/free-solid-svg-icons'
const Sidenav = ({ setGrid }) => {
    const [country, setCountry] = useState([])
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [address, setAddress] = useState([])
    const [userCountry, setUserCountry] = useState([])
    const [email, setEmail] = useState([])
    const [mobileNum, setMobileNum] = useState([])
    const profile = 'https://media-exp1.licdn.com/dms/image/C4E03AQHEqqFuc6u7wg/profile-displayphoto-shrink_800_800/0/1629138502134?e=1646870400&v=beta&t=D6qZoLQlTlCfAEP56hwv7sYbzPWhLC_gSTLpYDvwPKs'

    const handleRow = () => {
        setGrid(false)
    }
    const handleColum = () => {
        setGrid(true)
    }
    useEffect(() => {
        const getCountry = async () => {
            const res = await fetch(
                `https://restcountries.com/v3.1/all`
            );
            const data = await res.json();
            setCountry(data);
        };

        getCountry();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( mobileNum , firstName,lastName, email,address,userCountry)
        console.log('lkasdf')

    }
    // console.log(mobileNum.match(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/))
    return (
        <div className="">
            <div className="fixed shadow p-3 rounded bg-lite-green h-100vh col-md-3">
                <div className="container-fluid mt-3 ">
                    {/* Profile */}
                    <div className="shadow p-1 mb-5 bg-body rounded row">
                        <div className="col-md-4 d-flex align-items-center">
                            <img src={profile} className="profile" alt="Tamzid's profile" />
                        </div>
                        <div className="col-md-8">
                            <h6 className="">Hi Reader,</h6>
                            <p>Here's your News!</p>
                        </div>
                    </div>
                    {/* View Toggle */}
                    <div className="shadow p-3 mb-5 bg-body rounded">
                        <div className="total-content">
                            <h5 className="text-center">View Toggle</h5>

                            <div className="d-flex justify-content-center mt-4">
                                <div className="btn-group " role="group" aria-label="Basic example">
                                    <button className="btn btn-green" onClick={handleColum}><FontAwesomeIcon className="icon" icon={faGripVertical} /></button>
                                    <button className="btn btn-green" onClick={handleRow}><FontAwesomeIcon className="icon" icon={faAlignJustify} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Feedback */}
                    <div className="shadow p-1 pb-3 mb-5 bg-body rounded">
                        <div className="total-content">
                            <h5 className="text-center">Have a Feedback?</h5>

                            <div className="d-flex justify-content-center mt-4">
                                <button className="btn btn-green " data-bs-toggle="modal" data-bs-target="#exampleModalForSideNav">We are listening</button>
                            </div>
                        </div>
                    </div>
                    {/* feedback finish  */}
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModalForSideNav" tabIndex="-1" aria-labelledby="exampleModalForSideNav" aria-hidden="true"><br />
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-lite-green">
                        <div className="p-5 row">
                            <div className="col-md-10">
                                <h5 className="modal-title ps-3" id="exampleModalForSideNav">Thank you so much for talking the time!</h5>
                                <p className="modal-title ps-3">Please Provide the below details!</p>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body">

                            <div className="ps-5 ">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 col-md-4">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control border-0 shadow" placeholder="John" onChange={(e) =>setFirstName(e.target.value)} required/>
                                    </div>
                                    <div className="mb-4 col-md-4">
                                        <label className="form-label">Lase Name</label>
                                        <input type="text" className="form-control border-0 shadow" onChange={(e) =>setLastName(e.target.value)} placeholder="Deo" required/>
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="exampleFormControlTextarea1 " className="form-label">Address :</label>
                                        <textarea className="form-control border-0 shadow" id="exampleFormControlTextarea1" rows="3" onChange={(e) =>setAddress(e.target.value)} placeholder="Enter Your Full Postal Address !" required></textarea>
                                    </div>
                                    <div className="mb-4 col-md-4">
                                        <label className="form-label">Country</label>
                                        <input type="text" className="form-control border-0 shadow" onChange={(e) =>setUserCountry(e.target.value)} list="suggestions" placeholder="Bangladesh" required />
                                        <datalist id="suggestions">
                                            {country.length && country.map((data) => {
                                                return <option value={data.name.common} />
                                            })}
                                        </datalist>
                                    </div>
                                    <div className="mb-4 col-md-4">
                                        <label className="form-label">Email ID</label>
                                        <input type="email" className="form-control border-0 shadow" onChange={(e) =>setEmail(e.target.value)} placeholder="name@example.com" required />
                                    </div>
                                    <div className="mb-4 col-md-4">
                                        <label className="form-label">Phone Number</label>
                                        <input type="tel" pattern="^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{11}\s*,?$" className="form-control border-0 shadow" value={mobileNum} placeholder="+8801700000000" onChange={(e) =>setMobileNum(e.target.value)} required/>
                                    </div>
                                    <div className="mb-4 modal-footer">
                                        <button type="button" className="btn btn-red" data-bs-dismiss="modal">Close</button>
                                        <input type="submit" onSubmit={() => handleSubmit()} className="btn btn-green" value="Submit Feedback" />
                                    </div>
                                </form >
                            </div>

                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-red" data-bs-dismiss="modal">Close</button>
                            <input type="submit" onSubmit={() => handleSubmit()} className="btn btn-green" value="Submit Feedback" />
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Modal Finish */}
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Sidenav
