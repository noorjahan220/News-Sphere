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
        // Check if any article is declined and set the first decline reason found
        const declinedArticle = articles.find(article => article.isDeclined);
        if (declinedArticle) {
            setDeclineReason(declinedArticle.declineReason || 'No reason provided');
            setModalOpen(true);
        }
    }, [articles]);// Only run this when articles are fetched or updated

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-red-600">Error loading articles</div>;
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
        <div className="pt-24 px-4 pb-20 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">My Articles</h1>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
                <table className="w-full table-auto text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-b">#</th>
                            <th className="px-4 py-2 border-b">Title</th>
                            <th className="px-4 py-2 border-b">Details</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Is Premium</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{article.title}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => navigate(`/details/${article._id}`)}
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {article.isApproved ? (
                                        <span className="text-green-600 font-bold">Approved</span>
                                    ) : article.isDeclined ? (
                                        <span className="text-red-600 font-bold">Declined</span>
                                    ) : (
                                        <span className="text-yellow-600 font-bold">Pending</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {article.isPremium ? 'Yes' : 'No'}
                                </td>
                                <td className="px-4 py-2 border-b space-x-2">
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
            </div>

            {/* DaisyUI Modal for Decline Reason */}
            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md mx-auto p-6">
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
