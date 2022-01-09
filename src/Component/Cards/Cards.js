import React from 'react'
import './Cards.css'
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Loading from '../Loading/Loading';
const Cards = ({ grid }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0);

    let limit = 6;

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
            );
            const data = await res.json();
            const total = res.headers.get("x-total-count");
            setPageCount(Math.ceil(total / limit));
            setItems(data);
            setLoading(false)
        };

        getPosts();
    }, [limit]);
    const fetchPosts = async (currentPage) => {
        // console.log(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`)
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
        );
        // console.log(res)
        const data = await res.json();
        return data;
    };

    const handlePageClick = async (data) => {
        // console.log(data.selected);

        let currentPage = data.selected + 1;

        const postsFormServer = await fetchPosts(currentPage);

        setItems(postsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
    };
    const handlePostCancel = async (data) => {
        document.getElementById(`post${data}`).style.display = 'none';
    }
    return (
        <div className="container">
            <div className="row m-2">
                {!loading ? grid && items.map((item) => {
                    return (
                        <>
                            {<div key={item.title} id={`post${item.id}`} className="col-sm-6 col-md-4  my-2 courser-p " >
                                <div className="card shadow-sm w-100 card_click_ani">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-10 col-sm-9 col-9"data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                                <h5 className="card-subtitle mb-2  text-center text-dot">
                                                    {item.title}
                                                </h5></div>
                                            <div className="col-md-2 col-sm-3 col-3">
                                                <button type="button" onClick={() => handlePostCancel(item.id)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        </div>
                                        <div className="" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                            <h6 className="text-muted">{new Date().toDateString()}</h6>
                                            <div className="box">
                                                <p className="card-text">{item.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModal2">NEWS OF {item.title}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <iframe src="https://www.bing.com" style={{ width: '100%', height: '400px' }} title={item.title}></iframe>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </>
                    );
                }): <Loading/>}
                {!loading ? !grid && items.map((data) => {
                    // console.log(data.id)
                    return (
                        <div key={data.title} id={`post${data.id}`} className="">
                            <div className="row">
                                <div className="col-md-10 shadow card_click_ani bg-body rounded courser-p" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <h5 className="text-dot">
                                        {data.title}
                                    </h5>
                                    <p className="text-dot">
                                        {data.body}
                                    </p>
                                    <h6 className="text-muted">{new Date().toDateString()}</h6>
                                </div>
                                <div className="col-md-2 d-flex align-items-center">
                                    <button type="button" onClick={() => handlePostCancel(data.id)} className="btn-close shadow rounded-circle border border-danger" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                            <br />
                            {/* Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModal">NEWS OF {data.title}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <iframe src="https://www.bing.com" style={{ width: '100%', height: '400px' }} title={data.title}></iframe>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }): <Loading/>}



            </div>
            <br />
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                // breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                // breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default Cards
