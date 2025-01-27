import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyArticlePage = () => {
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure
            .get('/my-articles') 
            .then((response) => {
                setArticles(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching user articles:', error);
                setArticles([]); 
            });
    }, [axiosSecure]);

    // Open modal with decline reason
    const openDeclineReasonModal = (reason) => {
        setDeclineReason(reason);
        setModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Handle article deletion
    const handleDelete = (articleId) => {
        axiosSecure
            .delete(`/articles/${articleId}`)
            .then(() => {
                setArticles((prevArticles) => prevArticles.filter(article => article._id !== articleId));
            })
            .catch((error) => {
                console.error('Error deleting article:', error);
            });
    };

    return (
        <div className="pt-24 px-4">
            <h1 className="text-2xl font-bold mb-6">My Articles</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Details</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Is Premium</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={article._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => navigate(`/articles/${article._id}`)}
                                >
                                    View Details
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {article.isApproved ? (
                                    <span className="text-green-600 font-bold">Approved</span>
                                ) : article.isDeclined ? (
                                    <>
                                        <span className="text-red-600 font-bold">Declined</span>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                                            onClick={() => openDeclineReasonModal(article.declineReason)}
                                        >
                                            View Reason
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-yellow-600 font-bold">Pending</span>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {article.isPremium ? 'Yes' : 'No'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    onClick={() => navigate(`/articles/edit/${article._id}`)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(article._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <Modal isOpen={modalOpen} onClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">Decline Reason</h2>
                    <p className="mb-4">{declineReason}</p>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default MyArticlePage;
