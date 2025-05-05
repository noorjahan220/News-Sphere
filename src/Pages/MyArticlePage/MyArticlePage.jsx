import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiEye, FiAlertTriangle, FiPlus } from 'react-icons/fi';

// Extracted ArticleStatusBadge component
const ArticleStatusBadge = ({ isApproved, isDeclined }) => {
    if (isApproved) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                Approved
            </span>
        );
    }
    if (isDeclined) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                Declined
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400">
            Pending
        </span>
    );
};

const MyArticlePage = () => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: articles = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['my-articles'],
        queryFn: async () => {
            const response = await axiosSecure.get('/my-articles');
            return response.data;
        }
        
    });

    useEffect(() => {
        
        const declinedArticle = articles.find(article => article.isDeclined);
        if (declinedArticle) {
            setDeclineReason(declinedArticle.declineReason || 'No reason provided');
            setModalOpen(true);
            console.log('Articles:', articles); 
        }
    }, [articles]);

    const handleDelete = (articleId) => {
        Swal.fire({
            title: 'Delete Article?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#f3f4f6',
            confirmButtonColor: '#d97706',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/articles/${articleId}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Article deleted successfully',
                            icon: 'success',
                            background: '#1f2937',
                            color: '#f3f4f6',
                            confirmButtonColor: '#d97706',
                        });
                        refetch();
                    })
                    .catch((error) => {
                        console.error('Error deleting article:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete article',
                            icon: 'error',
                            background: '#1f2937',
                            color: '#f3f4f6',
                            confirmButtonColor: '#d97706',
                        });
                    });
            }
        });
       
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-zinc-700 rounded mb-4"></div>
                    <div className="h-4 w-64 bg-zinc-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
                <div className="text-center p-6 bg-zinc-800 rounded-lg border border-red-500/30 max-w-md">
                    <FiAlertTriangle className="mx-auto text-red-400 mb-4" size={32} />
                    <h3 className="text-xl font-semibold text-white mb-2">Error Loading Articles</h3>
                    <p className="text-gray-400 mb-4">Please try refreshing the page</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            My Articles
                        </h1>
                        <p className="text-gray-400">
                            {articles.length} {articles.length === 1 ? 'article' : 'articles'} submitted
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/addArticle')}
                        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                        <FiPlus size={18} />
                        New Article
                    </button>
                </div>

                {/* Articles Grid */}
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden hover:border-amber-500/50 transition-all duration-200"
                            >
                                {/* Article Header */}
                                <div className="p-5 border-b border-zinc-700">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <ArticleStatusBadge
                                            isApproved={article.isApproved}
                                            isDeclined={article.isDeclined}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs px-2 py-1 rounded ${article.isPremium ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-gray-400'}`}>
                                            {article.isPremium ? 'Premium' : 'Standard'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content Preview */}
                                <div className="p-5">
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {article.description ? article.description.substring(0, 150) : 'No content available'}...
                                    </p>
                                </div>

                                {/* Article Actions */}
                                <div className="p-5 border-t border-zinc-700 bg-zinc-800/50 flex justify-between">
                                    <button
                                        onClick={() => navigate(`/details/${article._id}`)}
                                        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FiEye size={16} />
                                        <span className="text-sm">View</span>
                                    </button>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate(`/update/${article._id}`)}
                                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                                            title="Edit"
                                        >
                                            <FiEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <FiEdit className="mx-auto text-gray-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-white mb-2">No Articles Yet</h3>
                            <p className="text-gray-400 mb-6">
                                You haven't submitted any articles yet. Get started by creating your first article!
                            </p>
                            <button
                                onClick={() => navigate('/addArticle')}
                                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Create Your First Article
                            </button>
                        </div>
                    </div>
                )}

                {/* Decline Reason Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                        <div className="bg-zinc-800 rounded-xl border border-amber-500/30 max-w-md w-full overflow-hidden">
                            <div className="p-5 border-b border-zinc-700 flex items-center gap-3">
                                <FiAlertTriangle className="text-amber-400" size={24} />
                                <h3 className="text-lg font-semibold text-white">Article Declined</h3>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-300 mb-1">Editor's feedback:</p>
                                <div className="bg-zinc-700 p-4 rounded-lg">
                                    <p className="text-white">{declineReason}</p>
                                </div>
                            </div>
                            <div className="p-5 border-t border-zinc-700 flex justify-end">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyArticlePage;