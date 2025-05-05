import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiFileText } from 'react-icons/fi';
import { FiCheck, FiX, FiStar, FiTrash2, FiAlertCircle } from 'react-icons/fi';

const AllArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    setIsLoading(true);
    axiosSecure
      .get('/pending-articles')
      .then((response) => {
        setArticles(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pending articles:', error);
        setIsLoading(false);
        Swal.fire('Error!', 'Failed to load articles.', 'error');
      });
  };

  // Handle the approval of an article
  const handleApprove = (id) => {
    setIsLoading(true);
    axiosSecure.put(`/approve-article/${id}`)
      .then(() => {
        setArticles(articles.map((article) =>
          article._id === id ? { ...article, isApproved: true } : article
        ));
        setIsLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Article has been approved.',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue approving the article.',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      });
  };

  // Handle declining an article with a reason
  const handleDecline = (id) => {
    setSelectedArticle(id);
    setModalIsOpen(true);
  };

  // Submit the decline reason and update article status
  const handleDeclineSubmit = () => {
    if (!declineReason.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please provide a reason for the decline.',
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }
    setIsLoading(true);
    axiosSecure.patch(`/articles/decline/${selectedArticle}`, { reason: declineReason })
      .then(() => {
        setArticles(articles.map((article) =>
          article._id === selectedArticle
            ? { ...article, isApproved: false, declineReason }
            : article
        ));
        setModalIsOpen(false);
        setDeclineReason('');
        setIsLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Article has been declined with reason.',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue declining the article.',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      });
  };

  // Handle marking an article as premium
  const handleMakePremium = (id) => {
    setIsLoading(true);
    axiosSecure.patch(`/articles/premium/${id}`)
      .then(() => {
        setArticles(articles.map((article) =>
          article._id === id ? { ...article, isPremium: true } : article
        ));
        setIsLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Article has been marked as Premium.',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue marking the article as Premium.',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        });
      });
  };

  // Handle deleting an article
  const handleDelete = (id) => {
    const articleToDelete = articles.find(article => article._id === id);

    Swal.fire({
      title: 'Are you sure?',
      text: articleToDelete?.isApproved 
        ? 'Approved articles can be archived instead of deleted.' 
        : 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      background: '#1a1a1a',
      color: '#fff',
      confirmButtonText: articleToDelete?.isApproved ? 'Archive' : 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axiosSecure.delete(`/articles/${id}`)
          .then(() => {
            setArticles(articles.filter((article) => article._id !== id));
            setIsLoading(false);
            Swal.fire({
              title: articleToDelete?.isApproved ? 'Archived!' : 'Deleted!',
              text: articleToDelete?.isApproved 
                ? 'The article has been archived.' 
                : 'The article has been deleted.',
              icon: 'success',
              background: '#1a1a1a',
              color: '#fff',
              confirmButtonColor: '#f59e0b'
            });
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the article.',
              icon: 'error',
              background: '#1a1a1a',
              color: '#fff',
              confirmButtonColor: '#f59e0b'
            });
          });
      }
    });
  };

  // Filter articles based on status and search term
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'pending' && !article.isApproved) || 
                         (filter === 'approved' && article.isApproved) || 
                         (filter === 'premium' && article.isPremium);
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="pt-24 px-4 text-center min-h-screen bg-zinc-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">Processing your request...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 min-h-screen bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-amber-500">Article Management</h1>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <select
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Articles</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <FiAlertCircle className="mx-auto h-12 w-12 text-amber-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-300">No articles found</h3>
            <p className="mt-2 text-sm text-gray-400">
              {searchTerm 
                ? 'No articles match your search criteria.' 
                : filter === 'pending' 
                  ? 'There are no pending articles at the moment.' 
                  : filter === 'approved' 
                    ? 'No approved articles found.' 
                    : filter === 'premium' 
                      ? 'No premium articles found.' 
                      : 'No articles available.'}
            </p>
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-lg overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">
                      Publisher
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-amber-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-800 divide-y divide-zinc-700">
                  {filteredArticles.map((article) => (
                    <tr key={article._id} className="hover:bg-zinc-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-zinc-700 rounded-md flex items-center justify-center">
                            <FiFileText className="h-6 w-6 text-amber-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{article.title}</div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {article.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{article.publisher}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.isPremium 
                            ? 'bg-purple-900 text-purple-300' 
                            : article.isApproved 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {article.isPremium ? 'Premium' : article.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {!article.isApproved && (
                            <button
                              onClick={() => handleApprove(article._id)}
                              className="text-green-500 hover:text-green-400 transition-colors p-1.5 rounded-md hover:bg-zinc-700"
                              title="Approve"
                            >
                              <FiCheck className="h-5 w-5" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDecline(article._id)}
                            className="text-red-500 hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-zinc-700"
                            title={article.isApproved ? "Revoke Approval" : "Decline"}
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                          
                          {!article.isPremium && (
                            <button
                              onClick={() => handleMakePremium(article._id)}
                              className="text-purple-500 hover:text-purple-400 transition-colors p-1.5 rounded-md hover:bg-zinc-700"
                              title="Make Premium"
                            >
                              <FiStar className="h-5 w-5" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDelete(article._id)}
                            className="text-gray-400 hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-zinc-700"
                            title={article.isApproved ? "Archive" : "Delete"}
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Decline Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="bg-zinc-800 rounded-lg shadow-xl w-full max-w-md border border-zinc-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Decline Article</h2>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for decline
                </label>
                <textarea
                  id="reason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows="4"
                  placeholder="Provide a clear reason for declining this article..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeclineSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiX className="mr-2" />
                  Submit Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticlesAdmin;