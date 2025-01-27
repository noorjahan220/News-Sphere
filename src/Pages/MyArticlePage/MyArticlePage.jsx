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
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch articles specific to the current user
        axiosSecure
            .get('/my-articles') // Endpoint for the user's articles
            .then((response) => {
                console.log('Fetched User Articles:', response.data);
                setArticles(response.data); // Set the articles
            })
            .catch((error) => {
                console.error('Error fetching user articles:', error);
                setArticles([]); // Handle error gracefully
            });
    }, []);

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
            .then((response) => {
                // Re-fetch the articles after deletion
                setArticles((prevArticles) => prevArticles.filter(article => article._id !== articleId));
            })
            .catch((error) => {
                console.error('Error deleting article:', error);
            });
    };

    return (
        <div className='pt-44'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article._id}>
                            <td>{article.title}</td>
                            <td>
                                {article.isApproved ? (
                                    <span>Approved</span>
                                ) : article.isDeclined ? (
                                    <>
                                        <span>Declined</span>
                                        <button onClick={() => openDeclineReasonModal(article.declineReason)}>
                                            View Reason
                                        </button>
                                    </>
                                ) : (
                                    <span>Pending</span>
                                )}
                            </td>
                            <td>
                                <button onClick={() => navigate(`/articles/${article._id}`)}>View Details</button>
                                <button>Update</button>
                                <button onClick={() => handleDelete(article._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <Modal isOpen={modalOpen} onClose={closeModal}>
                    <h2>Decline Reason</h2>
                    <p>{declineReason}</p>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default MyArticlePage;
