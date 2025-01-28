import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AllArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/pending-articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending articles:', error);
      });
  }, []);

  const handleApprove = (id) => {
    axiosSecure.put(`/approve-article/${id}`).then(() => {
      setArticles(articles.map((article) => article._id === id ? { ...article, isApproved: true } : article));
      Swal.fire('Success!', 'Article has been approved.', 'success'); // Success alert
    }).catch((error) => {
      console.error(error);
      Swal.fire('Error!', 'There was an issue approving the article.', 'error'); // Error alert
    });
  };

  const handleDecline = (id) => {
    setSelectedArticle(id);
    setModalIsOpen(true);
  };

  const handleDeclineSubmit = () => {
    axiosSecure.patch(`/articles/decline/${selectedArticle}`, { reason: declineReason })
      .then(() => {
        setArticles(articles.map((article) =>
          article._id === selectedArticle
            ? { ...article, isApproved: false, declineReason }
            : article
        ));
        setModalIsOpen(false);
        Swal.fire('Success!', 'Article has been declined with reason.', 'success'); // Success alert
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error!', 'There was an issue declining the article.', 'error'); // Error alert
      });
  };

  const handleMakePremium = (id) => {
    axiosSecure.patch(`/articles/premium/${id}`).then(() => {
      setArticles(articles.map((article) =>
        article._id === id ? { ...article, isPremium: true } : article
      ));
      Swal.fire('Success!', 'Article has been marked as Premium.', 'success'); // Success alert
    }).catch((error) => {
      console.error(error);
      Swal.fire('Error!', 'There was an issue marking the article as Premium.', 'error'); // Error alert
    });
  };

  const handleDelete = (id) => {
    // Find the article by id to check if it is approved
    const articleToDelete = articles.find(article => article._id === id);
  
    // Only allow deletion if the article is not approved
    if (articleToDelete && !articleToDelete.isApproved) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/articles/${id}`).then(() => {
            setArticles(articles.filter((article) => article._id !== id));
            Swal.fire('Deleted!', 'The article has been deleted.', 'success');
          }).catch((error) => {
            console.error(error);
            Swal.fire('Error!', 'There was an issue deleting the article.', 'error');
          });
        }
      });
    } else {
      Swal.fire('Error!', 'Approved articles cannot be deleted.', 'error');
    }
  };

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Articles</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id}>
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
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleApprove(article._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDecline(article._id)}
                >
                  Decline
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleMakePremium(article._id)}
                >
                  Make Premium
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DaisyUI Modal */}
      <input type="checkbox" id="decline-modal" className="modal-toggle" checked={modalIsOpen} onChange={() => setModalIsOpen(!modalIsOpen)} />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Provide a Reason for Declining</h2>
          <textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="border border-gray-300 p-2 w-full h-24 mb-4"
            placeholder="Write the reason for declining the article"
          />
          <div className="modal-action">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleDeclineSubmit}
            >
              Submit Reason
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
