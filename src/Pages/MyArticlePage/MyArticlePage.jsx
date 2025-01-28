import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyArticlePage = () => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch user articles using TanStack Query (v5)
    const { data: articles = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['my-articles'],
        queryFn: async () => {
            const response = await axiosSecure.get('/my-articles');
            return response.data;
        }
    });

    useEffect(() => {
        // Automatically open modal if the article is declined
        articles.forEach((article) => {
            if (article.isDeclined) {
                setDeclineReason(article.declineReason);
                setModalOpen(true); // Open the modal if the article is declined
            }
        });
    }, [articles]); // Only run this when articles are fetched or updated

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading articles</div>;
    }

    // Close the modal
    const closeModal = () => {
        setModalOpen(false); // Close the modal when the "Close" button is clicked
    };

    // Handle article deletion with SweetAlert confirmation
    const handleDelete = (articleId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion if confirmed
                axiosSecure
                    .delete(`/articles/${articleId}`)
                    .then(() => {
                        // Trigger a refetch to update the articles list
                        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
                        refetch(); // Refetch the articles from the server
                    })
                    .catch((error) => {
                        console.error('Error deleting article:', error);
                        Swal.fire('Error!', 'There was an error deleting the article.', 'error');
                    });
            }
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
                                    onClick={() => navigate(`/details/${article._id}`)}
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
                                    onClick={() => navigate(`/update/${article._id}`)}
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

            {/* DaisyUI Modal for Decline Reason */}
            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-bold mb-4">Decline Reason</h2>
                        <p className="mb-4">{declineReason || 'No reason provided'}</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArticlePage;
